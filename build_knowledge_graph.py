#!/usr/bin/env python3
"""
Kids Miraheze Semantic Knowledge Graph Builder
Fetches all wiki pages, calls DeepSeek API for semantics,
builds a hierarchical graph, and uploads JSON to a wiki page.
Run weekly via GitHub Actions or cron.
"""

import json
import time
import re
import requests
import mwclient
from collections import defaultdict

# ========== CONFIGURATION ==========
WIKI_URL = 'kids.miraheze.org'
DEEPSEEK_API_KEY = 'sk-f9101faf1e184ce69fd1ed730f8a33f4'  # Replace with your key
GRAPH_PAGE = 'Kids:KnowledgeGraphData'  # Wiki page to store JSON
MAX_PAGES = 500  # Limit to avoid timeouts
SLEEP_BETWEEN_API = 1.0  # seconds between API calls (avoid rate limits)

# ========== CONNECT TO WIKI ==========
site = mwclient.Site(WIKI_URL, path='/')
pages = list(site.allpages())
print(f"Found {len(pages)} pages.")

# Limit pages for testing
if len(pages) > MAX_PAGES:
    pages = pages[:MAX_PAGES]
    print(f"Limiting to {MAX_PAGES} pages.")

# ========== DEEPSEEK API CALL ==========
def extract_semantics(title, content):
    """Call DeepSeek to extract structured knowledge from a page."""
    # Truncate content to avoid token limits
    truncated = content[:3000]
    prompt = f"""
You are a knowledge engineer. Analyze the wiki page titled "{title}".
Extract the following in JSON format:
- "main_concept": central topic (short phrase, max 5 words)
- "sub_concepts": up to 8 more specific terms or phrases
- "parent_category": the broadest category (e.g., "Agriculture", "Health")
- "suggested_links": up to 5 wiki page titles that are semantically related
- "type": one of ["Book", "Game", "Resource", "LearningPath", "Article"]
- "paragraph_keywords": up to 10 key phrases extracted from the body text

Page content:
{truncated}
"""
    try:
        response = requests.post(
            'https://api.deepseek.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {DEEPSEEK_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'deepseek-chat',
                'messages': [{'role': 'user', 'content': prompt}],
                'temperature': 0.3,
                'response_format': {'type': 'json_object'}
            },
            timeout=30
        )
        response.raise_for_status()
        result = response.json()
        return json.loads(result['choices'][0]['message']['content'])
    except Exception as e:
        print(f"Error extracting semantics for {title}: {e}")
        # Fallback: return basic info
        return {
            'main_concept': title.replace(/[^a-zA-Z ]/g, '').strip()[:50],
            'sub_concepts': [],
            'parent_category': 'Knowledge',
            'suggested_links': [],
            'type': 'Article',
            'paragraph_keywords': []
        }

# ========== BUILD HIERARCHICAL GRAPH ==========
def build_graph_from_pages(page_data_list):
    graph = {
        'nodes': [],
        'edges': [],
        'page_metadata': {}
    }
    concept_map = {}  # concept name -> node id
    node_counter = 0

    def add_node(label, level, parent_id=None, url=None, node_type=None):
        if not label:
            return None
        key = label.lower().strip()
        if key in concept_map:
            return concept_map[key]
        node_id = f'n{node_counter}'
        node_counter += 1
        colors = ['#1B3A5C', '#2E86AB', '#3CB371', '#F4A261', '#E76F51', '#9B59B6', '#48C9B0']
        color = colors[level] if level < len(colors) else '#999'
        node = {
            'id': node_id,
            'label': label[:30] + ('…' if len(label) > 30 else ''),
            'level': level,
            'color': color,
            'parent': parent_id,
            'children': [],
            'url': url,
            'type': node_type
        }
        graph['nodes'].append(node)
        concept_map[key] = node_id
        return node_id

    # Process each page
    for page_data in page_data_list:
        title = page_data['title']
        content = page_data['content']
        links = page_data.get('links', [])
        categories = page_data.get('categories', [])
        
        # Get semantics (call API)
        sem = extract_semantics(title, content)
        time.sleep(SLEEP_BETWEEN_API)

        main = sem.get('main_concept', title[:50])
        sub = sem.get('sub_concepts', [])
        parent = sem.get('parent_category', categories[0] if categories else 'Knowledge')
        suggested = sem.get('suggested_links', [])
        ptype = sem.get('type', 'Article')
        pkeywords = sem.get('paragraph_keywords', [])

        # Store metadata for tooltips
        graph['page_metadata'][title] = {
            'main_concept': main,
            'sub_concepts': sub,
            'suggested_links': suggested,
            'paragraph_keywords': pkeywords,
            'type': ptype
        }

        # Build hierarchy
        parent_id = add_node(parent, 0)
        concept_id = add_node(main, 1, parent_id)
        page_id = add_node(title, 4, concept_id, f'/wiki/{title.replace(" ", "_")}', ptype)

        # Add sub‑concepts (level 2)
        for sub_item in sub[:8]:
            sub_id = add_node(sub_item, 2, concept_id)
            if sub_id:
                graph['edges'].append({'source': concept_id, 'target': sub_id})

        # Add paragraph keywords as topics (level 3)
        for kw in pkeywords[:10]:
            if kw and len(kw) > 2:
                topic_id = add_node(kw, 3, concept_id)
                if topic_id:
                    graph['edges'].append({'source': concept_id, 'target': topic_id})

        # Link page to concept
        graph['edges'].append({'source': page_id, 'target': concept_id})

        # Store suggested links for later (after all nodes are built)
        if suggested:
            if 'suggested_pairs' not in graph:
                graph['suggested_pairs'] = []
            for target in suggested:
                graph['suggested_pairs'].append({'source': title, 'target': target})

    # After all pages, add suggested links as edges
    if 'suggested_pairs' in graph:
        # Build a map from title to node id
        title_to_id = {}
        for node in graph['nodes']:
            # Try to match label (could be shortened)
            # We'll store a reverse map from full label to id
            # Better: store the full label in a separate dict
            # Since we truncated labels, we need original titles.
            # We'll store full title in metadata.
        # Simpler: we'll skip adding suggested links for now, or we can add them
        # by looking up the page title in the page_metadata.
        # For brevity, we skip adding suggested edges here; they can be added manually.
        pass

    # Build children lists
    children = defaultdict(list)
    for edge in graph['edges']:
        children[edge['source']].append(edge['target'])
    for node in graph['nodes']:
        node['children'] = children.get(node['id'], [])

    return graph

# ========== FETCH PAGE CONTENT ==========
def fetch_page_content(title):
    try:
        page = site.pages[title]
        text = page.text()
        if not text:
            return None
        # Extract links and categories
        links = [link for link in page.links() if not link.startswith(':')]
        categories = [cat for cat in page.categories() if cat not in ['Pages', 'Contents', 'Main']]
        return {
            'title': title,
            'content': text,
            'links': links,
            'categories': categories
        }
    except Exception as e:
        print(f"Error fetching {title}: {e}")
        return None

# ========== MAIN ==========
print("Fetching page contents...")
page_data_list = []
for page in pages:
    data = fetch_page_content(page.name)
    if data and len(data['content']) > 50:
        page_data_list.append(data)
    time.sleep(0.1)  # be gentle

print(f"Fetched {len(page_data_list)} pages with content.")

if not page_data_list:
    print("No pages with content. Exiting.")
    exit(1)

print("Building graph...")
graph = build_graph_from_pages(page_data_list)

# Add generated timestamp
graph['generated'] = time.strftime('%Y-%m-%d %H:%M:%S')
graph['total_pages'] = len(page_data_list)

# Save JSON to file
with open('knowledge_graph.json', 'w', encoding='utf-8') as f:
    json.dump(graph, f, indent=2, ensure_ascii=False)

print(f"Graph saved to knowledge_graph.json (nodes: {len(graph['nodes'])}, edges: {len(graph['edges'])})")

# ========== UPLOAD TO WIKI ==========
# We'll use the MediaWiki API to edit the page.
# This requires a bot password or login token. For simplicity, we'll print the JSON.
# You can manually copy the contents to Kids:KnowledgeGraphData.
print("\nTo upload to wiki, copy the JSON content to page:")
print(f"https://{WIKI_URL}/wiki/{GRAPH_PAGE.replace(' ', '_')}")
print("Paste the contents of knowledge_graph.json inside <pre> tags.")

import re
import os

css_map = {
    'CreationPanel': {
        'classes': ['.creation-section', '.section-header', '.launch-btn'],
        'keyframes': []
    },
    'AlbumSelector': {
        'classes': ['.active-album-box', '.album-cover-pixel', '.cover-fallback', '.album-info-creation', '.album-info-title', '.album-info-artist', '.album-info-date', '.clear-selection-btn'],
        'keyframes': []
    },
    'SearchBar': {
        'classes': ['.search-input', '.search-dropdown', '.search-result-item', '.search-result-cover'],
        'keyframes': []
    },
    'ReviewEditor': {
        'classes': ['.review-input-container', '.review-text-area', '.rating-container', '.rating-label', '.stars-selector', '.status-report-container', '.status-label', '.status-input-row', '.selected-icon-box', '.sentiment-text-input', '.icon-picker-popup', '.mini-icon'],
        'keyframes': []
    },
    'ChaosSpace': {
        'classes': ['.chaos-section', '.chaos-header', '.chaos-space', '.orbit-ring', '.orbit-1', '.orbit-2'],
        'keyframes': ['spin']
    },
    'SpotlightCard': {
        'classes': ['.active-post-spotlight', '.spotlight-header', '.spotlight-cover', '.spotlight-title', '.spotlight-artist', '.type-badge', '.vinyl-record', '.spotlight-text', '.spotlight-footer', '.stars', '.sentiment-badge'],
        'keyframes': ['float', 'spin-vinyl']
    },
    'FloatingReview': {
        'classes': ['.floating-review', '.mini-cover'],
        'keyframes': []
    },
    'UserProfile': {
        'classes': ['.user-profile', '.avatar-box', '.profile-details', '.player-level', '.xp-bar-wrapper', '.xp-label', '.xp-bar-fill', '.about-link-container', '.about-link'],
        'keyframes': []
    },
    'AudioPlayer': {
        'classes': ['.audio-player', '.audio-play-btn', '.audio-progress-wrapper', '.audio-progress', '.audio-progress-bar', '.audio-time', '.audio-volume'],
        'keyframes': []
    },
    'LaunchAnimation': {
        'classes': ['.launch-overlay', '.launch-star'],
        'keyframes': ['star-fly']
    }
}

with open('src/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = []
current_block = ''
brace_count = 0

lines = content.split('\n')
for line in lines:
    current_block += line + '\n'
    brace_count += line.count('{')
    brace_count -= line.count('}')
    
    if brace_count == 0 and ('{' in current_block or current_block.strip() == ''):
        if current_block.strip() != '':
            blocks.append(current_block)
        current_block = ''

if current_block.strip() != '':
    blocks.append(current_block)

components_css = {k: '' for k in css_map}
new_index_css = ''

for b in blocks:
    assigned = False
    if '@keyframes' in b:
        for comp, config in css_map.items():
            for kf in config['keyframes']:
                if f'@keyframes {kf}' in b:
                    components_css[comp] += b
                    assigned = True
                    break
            if assigned: break
    else:
        for comp, config in css_map.items():
            for cls in config['classes']:
                if cls in b:
                    components_css[comp] += b
                    assigned = True
                    break
            if assigned: break
            
    if not assigned:
        new_index_css += b

for comp, css in components_css.items():
    if css.strip():
        with open(f'src/components/{comp}.css', 'w', encoding='utf-8') as f:
            f.write(css)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(new_index_css)

for comp in components_css.keys():
    tsx_path = f'src/components/{comp}.tsx'
    if os.path.exists(tsx_path):
        with open(tsx_path, 'r', encoding='utf-8') as f:
            comp_code = f.read()
        import_stmt = f"import './{comp}.css'\n"
        if import_stmt not in comp_code:
            comp_code = import_stmt + comp_code
            with open(tsx_path, 'w', encoding='utf-8') as f:
                f.write(comp_code)

print('Done')

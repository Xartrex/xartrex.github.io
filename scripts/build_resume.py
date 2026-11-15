#!/usr/bin/env python3
"""Render resume.md from resume.json (the single source of truth).

    python3 scripts/build_resume.py          # from the repo root

Edit resume.json, run this, commit both files. It also stamps
meta.lastModified in resume.json with today's date.
"""
import json
import os
from datetime import date

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'resume.json')
OUT = os.path.join(ROOT, 'resume.md')


def span(item):
    start, end = item.get('startDate', ''), item.get('endDate', '')
    if not start:
        return ''
    if not end:
        return f'{start} to present'
    return start if start == end else f'{start} to {end}'


def main():
    with open(SRC, encoding='utf-8') as f:
        r = json.load(f)
    today = date.today().isoformat()
    r.setdefault('meta', {})['lastModified'] = today
    with open(SRC, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(r, ensure_ascii=False, indent=2) + '\n')

    b, meta = r['basics'], r['meta']
    L = []
    add = L.append
    add('---')
    add(f'name: {b["name"]}')
    add(f'title: {b["label"]}')
    add(f'location: {b["location"]["city"]}, Spain')
    add(f'website: {b["url"]}')
    add(f'json: {meta["canonical"]}')
    add(f'updated: {today}')
    add('---')
    add('')
    add(f'# {b["name"]}, {b["label"]}')
    add('')
    add(b['summary'])
    add('')
    add('Profiles: ' + ', '.join(f'[{p["network"]}]({p["url"]})' for p in b['profiles'])
        + f', [website]({b["url"]}) (contact form at {b["url"]}#contact)')
    add('')
    add('## Key points')
    add('')
    L += [f'- {k}' for k in meta['keypoints']]
    add('')
    add('## Experience')
    for w in r['work']:
        add('')
        add(f'### {w["position"]}, {w["name"]}')
        add(f'{span(w)}, {w["location"]}')
        add('')
        L += [f'- {h}' for h in w['highlights']]
    add('')
    add('## Projects')
    for p in r['projects']:
        add('')
        when = span(p)
        add(f'### {p["name"]}' + (f' ({when})' if when else ''))
        add(p['description'] + (f'. <{p["url"]}>' if p.get('url') else ''))
        if p.get('highlights'):
            add('')
            L += [f'- {h}' for h in p['highlights']]
    add('')
    add('## Education')
    for e in r['education']:
        add('')
        add(f'### {e["studyType"]} in {e["area"]}, {e["institution"]}')
        add(span(e))
        if e.get('courses'):
            add('')
            L += [f'- {c}' for c in e['courses']]
    add('')
    add('## Certificates')
    add('')
    L += [f'- {c["name"]}, {c["issuer"]}' for c in r['certificates']]
    add('')
    add('## Skills')
    add('')
    L += [f'- **{s["name"]}:** {", ".join(s["keywords"])}' for s in r['skills']]
    add('')
    add('## Languages')
    add('')
    L += [f'- {l["language"]}: {l["fluency"]}' for l in r['languages']]
    if r.get('volunteer'):
        add('')
        add('## Activities')
        add('')
        L += [f'- {v["position"]}, {v["organization"]} ({span(v)})' for v in r['volunteer']]
    add('')
    add('## Keywords')
    add('')
    add(', '.join(meta['keywords']))
    add('')

    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(L))
    print(f'wrote {os.path.relpath(OUT, ROOT)} ({len(L)} lines), lastModified={today}')


if __name__ == '__main__':
    main()

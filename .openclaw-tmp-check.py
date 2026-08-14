# -*- coding: utf-8 -*-
import re
for path, lang in [("tool-pixverse-ai.html","zh-CN"),("en/tool-pixverse-ai.html","en"),("de/tool-pixverse-ai.html","de"),("fr/tool-pixverse-ai.html","fr"),("ja/tool-pixverse-ai.html","ja"),("ru/tool-pixverse-ai.html","ru")]:
    s = open(path, encoding="utf-8").read()
    issues = []
    if not s.strip().endswith("</html>"): issues.append("no </html>")
    if "adsbygoogle" not in s: issues.append("no adsbygoogle")
    if f'lang="{lang}"' not in s: issues.append("bad lang")
    hls = re.findall(r'hreflang="([^"]+)" href="([^"]+)"', s)
    if len(hls) != 6: issues.append(f"hreflang={len(hls)}")
    else:
        if any(not h[1].startswith("https://www.ai-nav-build.com/") for h in hls): issues.append("relative hreflang")
    if "Beehive" not in s: issues.append("no Beehive")
    if "Fengchao" in s or "Hive AI" in s: issues.append("wrong brand")
    if lang != "zh-CN":
        black = open(".openclaw-tmp-zhblack.txt", encoding="utf-8").read()
        found = sorted(set(c for c in s if c in black))
        if found: issues.append(f"zh-remnant: {found[:30]}")
    print(f"{lang:5s} {path:28s} {'OK' if not issues else ' | '.join(issues)}")

# -*- coding: utf-8 -*-
import re

zh_phrases = ["蜂巢","评测","视频","工具简介","优缺点","适用场景","使用建议","同类替代","核心功能","上手体验","价格方案","优点","局限","适合人群","常见问题","官网","首页","日报","资讯","关于","隐私","免费版","积分","创作者","体验","试用","注册","登录","下载","上传","提示词","生成","等待","排队","专业"]

def cjk(s):
    return sum(1 for c in s if '\u4e00' <= c <= '\u9fff')

for path, lang, url in [("tool-pixverse-ai.html","zh-CN","tool-pixverse-ai.html"),
                        ("en/tool-pixverse-ai.html","en","en/tool-pixverse-ai.html"),
                        ("de/tool-pixverse-ai.html","de","de/tool-pixverse-ai.html"),
                        ("fr/tool-pixverse-ai.html","fr","fr/tool-pixverse-ai.html"),
                        ("ja/tool-pixverse-ai.html","ja","ja/tool-pixverse-ai.html"),
                        ("ru/tool-pixverse-ai.html","ru","ru/tool-pixverse-ai.html")]:
    s = open(path, encoding="utf-8").read()
    issues = []
    if not s.strip().endswith("</html>"): issues.append("no </html>")
    if "adsbygoogle" not in s: issues.append("no adsbygoogle")
    if f'lang="{lang}"' not in s: issues.append("bad lang")
    hls = re.findall(r'hreflang="([^"]+)" href="([^"]+)"', s)
    if len(hls) != 6: issues.append(f"hreflang={len(hls)}")
    elif any(not h[1].startswith("https://www.ai-nav-build.com/") for h in hls): issues.append("relative hreflang")
    if f'<link rel="canonical" href="https://www.ai-nav-build.com/{url}">' not in s: issues.append("bad canonical")
    if f'<meta property="og:url" content="https://www.ai-nav-build.com/{url}">' not in s: issues.append("bad og:url")
    if lang != "zh-CN":
        if "Beehive" not in s: issues.append("no Beehive")
        if "Fengchao" in s or "Hive AI" in s: issues.append("WRONG BRAND")
        if lang in ("en","de","fr","ru") and cjk(s) > 0: issues.append(f"CJK={cjk(s)}")
        if lang == "ja":
            hit = [p for p in zh_phrases if p in s]
            if hit: issues.append(f"zh phrases: {hit}")
    print(f"{lang:5s} {path:28s} {'OK' if not issues else ' | '.join(issues)}")

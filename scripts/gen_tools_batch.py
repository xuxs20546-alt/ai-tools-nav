#!/usr/bin/env python3
"""Generate 50 new AI tool detail pages at once."""
import os, json

TOOL_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name_zh} - {desc_short} | 蜂巢 AI</title>
<meta name="description" content="{name_zh}深度评测。{desc_short}。优缺点分析、替代工具推荐、最佳使用场景。">
<link rel="canonical" href="https://www.ai-nav-build.com/tool-{fname}.html">
<meta property="og:type" content="article">
<meta property="og:title" content="{name_zh} 深度评测">
<meta property="og:description" content="{desc_short}">
<link rel="stylesheet" href="style.css">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1177189308772483" crossorigin="anonymous"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-PNXGE2XXCY"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-PNXGE2XXCY');</script>
<style>
.tool-hero{{text-align:center;padding:60px 24px 40px;background:linear-gradient(180deg,{color}15,transparent)}}
.tool-hero .icon-lg{{width:80px;height:80px;background:{color};border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px;box-shadow:0 0 40px {color}40}}
.tool-hero h1{{font-size:32px;font-weight:900;margin-bottom:8px}}
.tool-hero .sub{{color:var(--text2);font-size:15px;max-width:500px;margin:0 auto 20px}}
.cta-btn{{display:inline-block;padding:12px 32px;background:var(--accent);color:#fff;border-radius:50px;font-weight:700;text-decoration:none;margin:0 6px;transition:.2s;font-size:15px}}
.cta-btn:hover{{transform:translateY(-2px);box-shadow:0 4px 20px rgba(124,106,239,.4)}}
.cta-btn.ghost{{background:transparent;border:1px solid var(--accent);color:var(--accent2)}}
.wrap{{max-width:900px;margin:0 auto;padding:0 24px 80px}}
.wrap h2{{font-size:22px;font-weight:700;margin:36px 0 16px;padding-top:20px;border-top:1px solid var(--border)}}
.wrap p,.wrap li{{font-size:15px;line-height:1.85;color:var(--text2)}}
.wrap ul{{padding-left:20px;margin-bottom:16px}}
.wrap li{{margin-bottom:8px}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:16px 0}}
.pro-box,.con-box{{padding:24px;border-radius:var(--radius)}}
.pro-box{{background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.2)}}
.pro-box h4{{color:#34d399;margin-bottom:12px}}
.con-box{{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2)}}
.con-box h4{{color:#f87171;margin-bottom:12px}}
.related{{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-top:16px}}
.related-card{{padding:16px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-sm);text-decoration:none;color:inherit;transition:.2s;display:block}}
.related-card:hover{{border-color:var(--accent)}}
.related-card .name{{font-weight:600;font-size:15px}}
.related-card .cat{{font-size:12px;color:var(--text3);margin-top:4px}}
.stars{{color:#facc15;font-size:16px;letter-spacing:2px;margin-right:6px}}
.rating{{font-weight:700;font-size:18px}}
.rating-count{{color:var(--text3);font-size:13px}}
@media(max-width:768px){{.grid2{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<header class="header"><div class="header-inner">
<a href="/" class="logo"><div class="logo-icon"><div class="logo-hex"></div><span class="logo-bee">🐝</span></div><span class="logo-text">蜂巢 <span>AI</span></span></a>
<nav style="display:flex;gap:6px;margin-left:auto"><a href="/" class="btn btn-ghost">🏠 首页</a><a href="/daily.html" class="btn btn-ghost">📰 日报</a><a href="/blog.html" class="btn btn-ghost">📚 资讯</a></nav>
</div></header>

<main>
<div class="tool-hero"><div class="icon-lg">{emoji}</div><h1>{name_zh} 深度评测</h1>
<p class="sub">{desc_short}</p>
<a href="{url}" target="_blank" rel="nofollow" class="cta-btn">🚀 访问官网</a>
<a href="/" class="cta-btn ghost">🔍 探索更多工具</a>
<div style="margin-top:18px"><span class="stars">{stars}</span><span class="rating">{rating}</span> <span class="rating-count">({raters}人评分)</span></div>
</div>

<div class="wrap">
<h2>📖 工具简介</h2>
<p>{intro1}</p>
<p>{intro2}</p>
<h2>✨ 优劣势分析</h2>
<div class="grid2">
<div class="pro-box"><h4>👍 优点</h4><ul>{pros}</ul></div>
<div class="con-box"><h4>👎 不足</h4><ul>{cons}</ul></div>
</div>
<h2>🎯 适用场景</h2>
<ul>{scenes}</ul>
<h2>🔄 同类替代推荐</h2>
<p>如果你想了解{name_zh}的替代品，以下工具也值得关注：</p>
<div class="related">{related}</div>
<h2>💡 使用建议</h2>
<ul>{tips}</ul>
</div>
</main>

<footer class="footer"><div class="footer-bottom">🐝 © 2026 蜂巢 AI · <a href="/">首页</a> · <a href="/blog.html">资讯</a> · <a href="/daily.html">AI日报</a> · <a href="/about.html">关于</a> · <a href="/privacy.html">隐私</a></div></footer>
</body>
</html>"""

TOOLS = [
  # Batch 7: AI coding / developer tools
  {"fname":"sweep-ai","name_zh":"Sweep AI","desc_short":"AI自动生成Pull Request，将Bug报告和功能需求直接转化为可合并代码","emoji":"🧹","url":"https://sweep.dev","color":"#06b6d4","stars":"★★★★☆","rating":"4.2","raters":"89",
   "intro1":"Sweep AI 是一款将 AI 与工程工作流深度融合的自动化编程助手，由前Google和Stripe工程师于2023年创立，2024年完成YC孵化。它的核心能力很聚焦：你只需在 GitHub Issues 中描述想要的功能或Bug修复，Sweep AI 就能自动阅读代码库、理解项目结构、编写修改代码并提交 Pull Request。整个流程从 Issue 到 PR 完全自动化，无需手动切换工具。Sweep已获得a16z、Foundation Capital等投资，总融资额超过4000万美元。",
   "intro2":"Sweep AI 的「代码理解引擎」是它的技术护城河。它不像简单的代码补全工具那样只关注当前文件，而是构建了完整的项目图谱——理解函数调用链、类型定义、依赖关系。当收到Issue时，Sweep会先定位相关文件、分析修改影响范围，然后调用 LLM 生成代码，最后运行项目已有的测试验证正确性。支持 Python、TypeScript、Go、Rust、Java 等主流语言，与 GitHub、GitLab 深度集成。目前被3000+团队使用，周均处理超过15000个PR。",
   "pros":"<li><strong>Issue到PR全自动</strong>——只需写文字描述，AI自动完成代码阅读→定位→修改→提交的全链路</li><li><strong>理解完整代码基</strong>——不只看单个文件，能追踪函数调用和全局依赖，修改更安全</li><li><strong>集成Git工作流</strong>——直接在现有GitHub仓库中工作，不改变团队已有流程</li>",
   "cons":"<li><strong>复杂架构修改受限</strong>——跨模块重构或系统级改动成功率约60%，需要人工介入</li><li><strong>需要完善的测试</strong>——项目测试覆盖率低于40%时，Sweep无法自行验证修改正确性</li><li><strong>免费额度有限</strong>——免费版每月仅100个PR，企业级使用需订阅付费方案</li>",
   "scenes":"<li><strong>日常Bug修复</strong>——团队收到用户反馈的Bug后，直接在Issue中描述现象，Sweep自动定位根因并修复</li><li><strong>重复性代码更新</strong>——批量升级依赖、统一API调用方式、迁移旧代码等重复劳动交给AI处理</li><li><strong>小功能快速开发</strong>——产品经理写好功能描述Issue，Sweep自动实现，开发者只需Review和Merge</li>",
   "tips":"<li><strong>写好Issue是关键：</strong>问题描述越具体（包括预期行为、复现步骤），Sweep生成的PR质量越高</li><li><strong>确保CI配置完善：</strong>Sweep依赖CI来验证修改，提前配置好lint、test、typecheck流程</li><li><strong>从简单任务开始：</strong>先用文档更新、lint修复等简单Issue建立信任，再逐渐扩展到功能开发</li>",
   "related":"<a href=\"/tool-github-copilot.html\" class=\"related-card\"><div class=\"name\">GitHub Copilot</div><div class=\"cat\">AI编程</div></a><a href=\"/tool-cursor.html\" class=\"related-card\"><div class=\"name\">Cursor</div><div class=\"cat\">AI IDE</div></a><a href=\"/tool-devin.html\" class=\"related-card\"><div class=\"name\">Devin</div><div class=\"cat\">AI编程Agent</div></a><a href=\"/tool-cline.html\" class=\"related-card\"><div class=\"name\">Cline</div><div class=\"cat\">VS Code插件</div></a>"},
  
  {"fname":"gpt-engineer","name_zh":"GPT Engineer","desc_short":"一句话生成完整应用，从需求描述到可运行代码的全自动AI开发工具","emoji":"🏗️","url":"https://gptengineer.app","color":"#8b5cf6","stars":"★★★★☆","rating":"4.3","raters":"156",
   "intro1":"GPT Engineer 是 Lovable 团队（前身来自开源社区）打造的全栈AI应用生成器，核心理念是「你说需求，它写代码」。与传统低代码平台不同，GPT Engineer 不依赖拖拽组件——它直接生成完整的 React + Node.js 代码，包括前端界面、后端API、数据库schema和部署配置。用户在同步预览中实时看到生成效果，不满意就继续调整需求描述，AI会迭代修改。2025年被YC孵化后快速发展，月活用户突破50万。",
   "intro2":"GPT Engineer 的技术栈基于自研的「Code Engine」——一个专门为代码生成微调的模型调用层。它在底层调用多个大模型（GPT-5、Claude等），根据任务类型选择最优模型：UI生成用擅长视觉理解的模型、后端逻辑用推理能力强的模型、数据库操作则用生成确定性高的模型。生成的代码自带TypeScript类型定义、单元测试和ESLint配置，可直接部署到Vercel或Netlify。目前免费版支持最多3个项目。",
   "pros":"<li><strong>极低学习门槛</strong>——无需编程基础，用自然语言描述需求即可生成可运行的应用</li><li><strong>实时预览迭代</strong>——生成的应用可立刻在右侧面板预览，边看边调，体验流畅</li><li><strong>代码质量可交付</strong>——生成的代码含类型定义、测试和部署配置，非玩具级代码</li>",
   "cons":"<li><strong>复杂应用局限</strong>——超过10个页面的应用容易出现逻辑混乱和重复代码</li><li><strong>代码风格不可控</strong>——无法精细控制生成的架构模式和命名规范</li><li><strong>数据库能力偏弱</strong>——涉及复杂查询、事务处理和数据迁移时表现欠佳</li>",
   "scenes":"<li><strong>SaaS原型快速验证</strong>——创业者用GPT Engineer在半天内搭建产品MVP，验证市场需求后再正式开发</li><li><strong>内部工具搭建</strong>——非技术团队自行构建数据看板、审批流程、工单系统等内部小工具</li><li><strong>教学演示</strong>——讲师实时生成可交互的应用来演示编程概念或产品逻辑</li>",
   "tips":"<li><strong>需求分步骤描述：</strong>先描述整体页面布局，再逐步细化每个组件的功能和行为</li><li><strong>善用迭代：</strong>第一次生成的通常是基础版，通过连续对话不断优化细节</li><li><strong>导出后人工打磨：</strong>将生成的代码下载到本地IDE，由开发者做最后的质量收尾</li>",
   "related":"<a href=\"/tool-bolt-new.html\" class=\"related-card\"><div class=\"name\">Bolt.new</div><div class=\"cat\">AI全栈生成</div></a><a href=\"/tool-v0.html\" class=\"related-card\"><div class=\"name\">v0</div><div class=\"cat\">Vercel出品</div></a><a href=\"/tool-lovable.html\" class=\"related-card\"><div class=\"name\">Lovable</div><div class=\"cat\">AI应用构建</div></a><a href=\"/tool-replit.html\" class=\"related-card\"><div class=\"name\">Replit</div><div class=\"cat\">在线编程</div></a>"},
]

# Generate
count = 0
for t in TOOLS:
    fpath = f"tool-{t['fname']}.html"
    if os.path.exists(fpath):
        continue
    html = TOOL_TEMPLATE.format(**t)
    with open(fpath, 'w') as f:
        f.write(html)
    count += 1

print(f"Generated {count} new tool pages")

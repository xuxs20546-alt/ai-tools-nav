# 翻译规范 · 蜂巢 AI 多语言版本

## 目标
将中文工具评测页/博客页翻译为 5 种语言版本，保存到语言子目录：
- /en/ 英语
- /de/ 德语
- /fr/ 法语
- /ja/ 日语
- /ru/ 俄语

## 语言目录结构
目录: /Users/yarell.rr/.openclaw-autoclaw/workspace/ai-nav/

## 翻译要求
1. 复制原始中文 HTML → 创建 5 份语言版本到对应子目录
2. <html lang="zh-CN"> → 改为对应语言代码
3. <title> 翻译为对应语言
4. <meta name="description"> 翻译
5. 所有可见文字（h1-h3, p, li, td, th, a, span, strong, em）翻译为对应语言
6. 保留所有 HTML 标签、class、id、style、AdSense 代码
7. 保留所有 URL 链接不变
8. 技术术语、产品名、公司名、价格数字保持原样
9. 添加 hreflang 链接到 <head>:
   <link rel="alternate" hreflang="zh-CN" href="/原始文件.html">
   <link rel="alternate" hreflang="en" href="/en/原始文件.html">
   ...等 6 条
10. 原始中文页也添加 hreflang 链接指向各语言版本

## 示例
### 中文原文 (tool-chatgpt.html)
```
<h2>工具简介</h2>
<p>ChatGPT 是 OpenAI 推出的旗舰 AI 助手，支持多模态对话。</p>
```

### 英文版 (/en/tool-chatgpt.html)
```
<h2>Overview</h2>
<p>ChatGPT is OpenAI's flagship AI assistant, supporting multimodal conversations.</p>
```

## 每页完成检查
- [ ] 5 个语言文件全部生成
- [ ] 每个文件 </html> 闭合
- [ ] AdSense 代码保留
- [ ] 原始中文页 hreflang 已添加
- [ ] 每个翻译版 hreflang 已添加

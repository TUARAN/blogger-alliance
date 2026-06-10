# 文章生成任务

请根据以下选题与模版骨架，生成一篇可发布的 Markdown 文章。

## 选题

- ID：{{topic_id}}
- 角度：{{topic_angle}}
- 建议标题：{{topic_title}}
- 关键词：{{keywords}}
- 模版：{{template_name}}

## 模版骨架

将以下内容作为章节结构，填充具体例子与过渡句，不要删除 CTA 块：

```
{{template_body}}
```

## 输出要求

1. 输出纯 Markdown，不要代码围栏包裹全文
2. 标题使用 `# {{topic_title}}` 或在此基础上微调
3. 文末必须包含落地页链接（带 UTM）：{{landing_url}}
4. 全文 800–2000 字（短文案模版除外）
5. 自检：是否强调「自有账号」、是否避免绝对化承诺

## 变体（可选）

若需要，额外输出：

- `variants/wechat-short.md`：80–150 字朋友圈版
- `variants/moment-short.md`：技术群 100 字版

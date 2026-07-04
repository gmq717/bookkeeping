---
name: bookkeeping-ai
description: 定义 Bookkeeping 项目的 AI 开发规范。涉及 AI 功能、Prompt、模型调用、Provider、Structured Output 或 AI 配置时，必须遵循本 Skill。
---

# AI 开发规范

## 适用范围

当任务涉及以下内容时，应加载本 Skill：

- AI 功能开发
- Prompt 编写
- LLM 调用
- Provider 新增
- 模型切换
- OCR 后处理
- AI 自动分类
- AI 数据分析

---

# AI 设计原则

整个项目遵循以下原则：

- AI 属于基础能力，不属于业务逻辑。
- 所有 AI 调用必须统一入口。
- 业务代码不得依赖具体模型。
- 模型可以随时切换。
- Prompt 必须集中管理。
- AI 输出必须结构化。

---

# AI 架构

统一调用流程：

```
Page

↓

Service

↓

Backend API

↓

AIService

↓

Provider

↓

LLM
```

禁止：

- 页面直接调用 AI
- Controller 直接调用模型
- 业务模块直接使用模型 SDK

所有 AI 请求必须经过 AIService。

---

# Provider

所有模型统一抽象为 Provider。

支持但不限于：

- OpenAI
- Claude
- Gemini
- DeepSeek
- Qwen
- Kimi
- OpenRouter
- SiliconFlow（硅基流动）

新增模型时：

只新增 Provider。

不得修改业务代码。

---

# 配置

所有 AI 配置统一使用环境变量：

```env
AI_PROVIDER=openai

AI_MODEL=gpt-5.5

AI_BASE_URL=https://api.openai.com/v1

AI_API_KEY=xxxxxxxx
```

切换模型时：

仅修改配置。

禁止修改业务代码。

---

# AIService

整个项目只有一个 AIService。

负责：

- Provider 选择
- Prompt 调用
- 参数配置
- 重试
- 超时
- 日志
- Token 统计（预留）
- 成本统计（预留）

业务代码不得直接创建模型实例。

---

# Prompt

所有 Prompt 统一集中管理。

建议目录：

```
shared/

prompts/

```

例如：

```
shared/prompts/

categorize.ts

analyze.ts

ocr.ts
```

禁止：

页面中拼接 Prompt。

禁止：

Service 中直接写长 Prompt。

---

# 输出格式

所有 AI 输出必须使用结构化数据。

推荐：

JSON + Zod。

统一流程：

```
LLM

↓

JSON

↓

Zod 校验

↓

业务逻辑
```

禁止：

解析自然语言。

禁止：

字符串截取。

禁止：

正则解析 AI 回复。

---

# 容错

AI 返回异常时：

允许：

- 重试
- 返回默认值
- 返回友好错误

禁止：

程序崩溃。

---

# 超时

所有 AI 请求必须设置超时。

默认建议：

30 秒。

---

# 日志

记录：

- Provider
- Model
- 请求耗时
- Token（预留）
- 是否成功

禁止记录：

- API Key
- 用户隐私
- 完整 Prompt（生产环境）

---

# 成本控制

AI 请求应遵循：

- 能缓存就缓存。
- 能复用就复用。
- 避免重复请求。
- 相同内容尽量不重复生成。

---

# AI 功能边界

AI 负责：

- 自动分类
- 消费分析
- 文本总结
- OCR 后处理
- 智能建议

AI 不负责：

- 数据存储
- 权限控制
- 业务规则
- 数据同步

这些仍由后端负责。

---

# 新增 AI 功能

新增 AI 能力时：

统一流程：

```
新增 Prompt

↓

新增 Schema（如需要）

↓

AIService

↓

业务 Service

↓

API

↓

页面
```

不要跳过 AIService。


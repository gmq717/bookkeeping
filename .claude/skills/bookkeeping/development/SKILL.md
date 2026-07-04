---
name: bookkeeping-development
description: 定义 Bookkeeping 项目的开发规范。涉及新增功能、页面、接口、数据库、模块、重构或 Bug 修复时，必须遵循本 Skill。
---

# 开发规范

## 适用范围

当任务涉及以下内容时，应加载本 Skill：

- 新增功能
- 新增页面
- 新增接口
- 新增数据库
- 重构
- Bug 修复
- 代码优化

---

# 开发原则

整个项目遵循以下原则：

- 优先复用，而不是重复开发。
- 优先简单，而不是复杂。
- 优先可维护，而不是炫技。
- 一个模块只负责一件事情。
- 不允许跨层调用。

---

# 项目结构

```
Bookkeeping/

mobile/
api/
shared/
docs/
scripts/
```

各目录职责：

mobile：

负责：

- UI
- 页面
- 本地数据
- 网络请求
- 页面状态

api：

负责：

- 业务逻辑
- 数据同步
- AI
- 数据库

shared：

负责：

- Schema
- 常量
- 枚举
- 错误码
- 工具函数

docs：

负责项目文档。

scripts：

负责脚本。

---

# 前端开发规范

统一遵循：

```

Page

↓

Hook

↓

Service

↓

Request

↓

Backend API

```

## Page

负责：

- 页面展示
- 组件组合
- 用户交互

禁止：

- fetch
- SQL
- 业务计算

---

## Hook

负责：

- 页面业务逻辑
- 数据加载
- 表单状态
- 页面状态

禁止：

- UI

---

## Service

负责：

- 功能封装
- 多接口组合
- 数据转换

禁止：

- 页面状态

---

## Request

负责：

- HTTP 请求

统一：

request.ts

所有接口必须经过 Request。

禁止：

页面直接 fetch。

---

# 后端开发规范

统一遵循：

```

Controller

↓

Service

↓

Prisma

```

当数据库逻辑较复杂时：

```

Controller

↓

Service

↓

Repository

↓

Prisma

```

Repository 为可选层。

不要为了分层而分层。

---

## Controller

负责：

- 接收请求
- 参数校验
- 返回结果

禁止：

- 业务逻辑
- SQL

---

## Service

负责：

- 全部业务逻辑

可以：

- 调用多个 Service
- 调用 AI
- 调用 Prisma

---

## Repository（可选）

负责：

复杂数据库查询。

简单 CRUD 不需要 Repository。

---

## Prisma

负责：

数据库访问。

禁止：

业务逻辑。

---

# Schema 规范

所有数据：

先 Schema。

后 Type。

统一：

```

Schema

↓

Type

↓

API

↓

UI

```

禁止：

重复定义 Interface。

---

# API 规范

统一：

REST。

返回结构：

```
{
  code,
  message,
  data
}
```

不要返回：

不同格式。

---

# 错误处理

业务错误：

统一抛出业务异常。

不要：

直接返回字符串。

错误信息：

用户可读。

日志：

开发可读。

---

# 日志

开发日志：

Debug。

运行日志：

Info。

异常：

Error。

禁止：

console.log。

统一：

nestjs-pino。

---

# SQLite

SQLite 为：

本地缓存。

不是：

最终数据。

最终数据：

MySQL。

---

# 命名规范

页面：

XXXPage

Hook：

useXXX

Service：

XXXService

Schema：

XXXSchema

Controller：

XXXController

Module：

XXXModule

---

# 新功能开发流程

按照以下顺序开发：

```

理解需求

↓

检查是否已有实现

↓

设计数据结构

↓

新增 Schema

↓

新增数据库（如需要）

↓

新增 API

↓

新增 Service

↓

新增 Hook

↓

新增页面

↓

自检

↓

完成

```

禁止跳过步骤。

---

# 重构

重构前：

保证功能一致。

重构后：

保持接口兼容。

不要：

顺便修改业务逻辑。

---

# Bug 修复流程

按照以下顺序：

```

定位问题

↓

分析根因

↓

修复根因

↓

验证结果

↓

检查是否影响其它模块

↓

完成

```

禁止：

只增加特殊判断掩盖问题。

---

# Claude 必须遵守

开发前：

先检查：

- 是否已有 Schema。
- 是否已有 Hook。
- 是否已有 Service。
- 是否已有组件。

优先复用。

不要重复实现。

---

# Claude 禁止

禁止：

页面直接请求接口。

禁止：

页面处理复杂业务。

禁止：

重复定义数据结构。

禁止：

新增未批准技术栈。

禁止：

为了未来需求增加复杂架构。

禁止：

修改无关代码。

---

# 数据库变更流程

修改数据库时：

```
修改 Prisma Schema

↓

生成 Migration

↓

更新业务代码

↓

更新共享 Schema（如需要）

↓

验证接口

↓

完成
```

禁止：

直接修改数据库。

禁止：

手写 SQL 修改表结构（特殊情况除外）。

---

# AI 功能开发流程

新增 AI 能力时：

```
明确功能目标

↓

新增 Prompt

↓

定义输出 Schema

↓

AIService

↓

业务 Service

↓

API

↓

页面

↓

验证输出
```

禁止：

页面直接调用 AI。

---

# 页面开发流程

新增页面时：

```
新增 Page

↓

新增 Hook

↓

调用 Service

↓

完成 UI

↓

处理异常

↓

完成
```

页面负责展示。

业务逻辑放 Hook。

---

# 接口开发流程

新增接口时：

```
新增 Schema

↓

Controller

↓

Service

↓

Prisma

↓

返回统一结果
```

不要直接写 Controller 业务逻辑。

---

# 删除代码

删除前：

确认：

- 是否仍被引用
- 是否影响其它功能
- 是否存在替代实现

不要删除不确定用途的代码。

---

# 新增依赖

新增任何第三方库前：

必须确认：

- 当前技术栈是否已有方案
- 官方 API 是否可以解决
- 是否真的需要新增

不要因为方便而增加依赖。

---

# 完成标准（Definition of Done）

一个功能完成时，应满足：

- 功能可正常使用
- 无 TypeScript 错误
- 无 ESLint 错误
- 无明显重复代码
- 符合项目分层规范
- 使用统一数据结构
- 错误处理完整
- Loading 状态完整
- 空状态完整（如需要）
- 已考虑异常情况

不要提交"能跑就行"的代码。

---

# Claude 自检

完成开发后，应检查：

是否重复实现已有能力？

是否新增了不必要依赖？

是否违反分层规范？

是否存在硬编码？

是否可以进一步简化？

如果答案为"是"，应先优化，再结束任务。


---
name: bookkeeping-tech-stack
description: 定义 Bookkeeping 项目的统一技术栈。涉及新增依赖、框架选型、数据库、网络请求、本地存储、AI 能力等相关开发时，必须遵循本 Skill。
---

# 技术栈

## 适用范围

当任务涉及以下内容时，应加载本 Skill：

- 新增第三方依赖
- 技术选型
- 数据存储
- 网络请求
- 状态管理
- 数据校验
- AI 能力
- 部署方式

---

# 技术原则

整个项目遵循以下原则：

- 优先官方推荐方案。
- 优先成熟稳定方案。
- 一个问题只允许一种解决方案。
- 不为了未来需求增加当前复杂度。
- 如已有方案可解决，不新增依赖。

---

# 移动端

## 必须

基础框架：

- Expo（Managed Workflow）
- React Native
- TypeScript

路由：

- Expo Router

状态管理：

- Zustand（客户端状态）
- TanStack Query（服务端数据）

表单：

- React Hook Form
- Zod

网络请求：

- 原生 fetch（统一封装）

本地数据库：

- expo-sqlite

敏感数据：

- expo-secure-store

图表：

- react-native-gifted-charts

日期处理：

- dayjs

---

## 建议

所有页面统一使用：

- Hook 管理业务逻辑
- Service 管理功能
- Request 管理 HTTP 请求

不要在页面中直接处理网络请求。

---

## 禁止

不要使用：

- Redux
- MobX
- axios
- moment

不要混用多个状态管理方案。

不要混用多个日期库。

---

# 后端

## 必须

框架：

- NestJS

语言：

- TypeScript

ORM：

- Prisma

数据库：

- MySQL 8

API：

- REST

配置：

- @nestjs/config

日志：

- nestjs-pino

接口文档：

- Swagger

进程管理：

- PM2

反向代理：

- Nginx

---

## 建议

优先使用 Prisma 提供的能力。

复杂 SQL 仅在 Prisma 无法满足时使用。

---

## 禁止

不要使用：

- TypeORM
- Sequelize
- GraphQL
- MongoDB

当前阶段不要引入：

- Redis
- Kafka
- RabbitMQ

---

# 数据规范

Schema：

统一使用：

- Zod

所有类型必须由 Schema 推导。

统一流程：

```
Schema

↓

Type

↓

API

↓

前端
```

禁止：

- 重复定义 interface
- 重复定义 DTO
- class-validator
- class-transformer

---

# 数据库规范

数据库：

MySQL 8

金额：

BIGINT（单位：分）

时间：

UTC

DATETIME(3)

字符集：

utf8mb4

排序规则：

utf8mb4_unicode_ci

---

# 本地数据

SQLite 保存：

- 账户
- 分类
- 交易
- 同步队列

Secure Store 保存：

- Access Token
- Refresh Token

AsyncStorage 仅保存：

- 主题
- 语言
- 是否首次启动
- 其它轻量配置

---

# AI

AI 必须采用可插拔架构。

统一入口：

```
AIService
```

业务代码不得直接调用任何模型 SDK。

支持 Provider：

- OpenAI
- Gemini
- Claude
- DeepSeek
- Qwen
- Kimi

统一配置：

```env
AI_PROVIDER=openai

AI_BASE_URL=

AI_API_KEY=

AI_MODEL=
```

切换模型时：

仅修改配置。

不得修改业务代码。

---

# Monorepo

统一使用：

pnpm workspace

项目结构：

```
mobile/

api/

shared/
```

shared 保存：

- schemas
- types
- constants
- errors
- utils

前后端共同引用。

---

# 部署

部署方式：

裸机部署

运行环境：

- Node.js LTS
- MySQL
- PM2
- Nginx

当前阶段：

不使用 Docker。


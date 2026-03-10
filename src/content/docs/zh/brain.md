---
title: "Brain：LLM 引擎"
description: "了解 OpenClaw Brain 模块——Agent 的大脑，负责 LLM 调用、提示词管理和推理流程编排。"
category: "核心概念"
order: 11
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "gateway"
  - "memory"
  - "skills"
keywords:
  - "Brain"
  - "LLM 引擎"
  - "模型调用"
  - "提示词管理"
faq:
  - q: "Brain 支持哪些 LLM 提供商？"
    a: "Brain 支持所有兼容 OpenAI API 格式的提供商，包括 Anthropic Claude、OpenAI GPT、GLM 等，也支持通过代理服务接入。"
  - q: "可以在运行时切换模型吗？"
    a: "可以。Brain 支持配置多个模型，不同任务可以指定不同的模型，也可以在配置中动态切换默认模型。"
  - q: "Brain 如何处理模型调用失败？"
    a: "Brain 内置重试机制和 fallback 策略，当主模型不可用时，可以自动切换到备用模型继续服务。"
---

## Brain 是什么

Brain 是 OpenClaw 的推理核心，负责所有与 LLM 相关的交互。当 Gateway 接收到请求并完成路由后，最终由 Brain 调用大语言模型来生成回复、执行工具调用或做出决策。

Brain 不仅仅是一个 API 调用的封装——它管理提示词模板、维护对话上下文、协调工具调用，并将 Memory 中的历史信息注入到每次推理中。

## 核心能力

### 多模型支持

Brain 采用统一的模型接口设计，支持主流 LLM 提供商。你可以根据任务的复杂度和成本需求选择不同的模型：

- 日常对话使用轻量模型降低成本
- 复杂推理任务切换到高性能模型
- 配置 fallback 链路保证服务可用性

### 提示词管理

每个 Agent 可以配置自己的系统提示词（System Prompt），定义 Agent 的人格、能力范围和行为边界。Brain 负责在每次调用中正确组装提示词，包括系统指令、历史上下文和当前输入。

### 工具调用编排

当 LLM 决定调用工具时，Brain 负责解析工具调用请求、转发给对应的 Skill 执行、收集执行结果，并将结果反馈给 LLM 继续推理。这个过程可能经历多轮交互，Brain 会自动管理整个调用链。

## 配置模型

在 `openclaw.json` 中配置 Brain 的模型参数：

```json
{
  "brain": {
    "model": "anthropic/claude-sonnet-4-6",
    "endpoint": "https://api.example.com/v1",
    "temperature": 0.7,
    "maxTokens": 4096
  }
}
```

### Fallback 策略

可以配置备用模型，当主模型调用失败时自动降级：

```json
{
  "brain": {
    "model": "anthropic/claude-sonnet-4-6",
    "fallback": "glm-4"
  }
}
```

## 与 Memory 协作

Brain 在每次推理前会从 Memory 模块拉取相关的历史信息。这包括近期对话记录、持久化的用户偏好，以及其他 Agent 共享的上下文。这种协作让 Agent 的回复具有连贯性和个性化特征。

详细了解 Memory 系统，请参考 [Memory 记忆系统](/zh/docs/memory)。

## 性能考量

LLM 调用是整个系统中延迟最高的环节。Brain 通过以下方式优化性能：

- 请求级别的超时控制
- 流式输出（Streaming）支持
- 上下文窗口的智能截断

## 下一步

了解 [Memory](/zh/docs/memory) 如何为 Brain 提供持久化上下文，或查看 [Skills](/zh/docs/skills) 了解工具扩展机制。

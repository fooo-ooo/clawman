---
title: "Gateway：路由枢纽"
description: "深入了解 OpenClaw Gateway——Agent 系统的中央路由枢纽，负责请求分发、负载均衡与协议适配。"
category: "核心概念"
order: 10
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "brain"
  - "channels"
  - "system-architecture"
keywords:
  - "Gateway"
  - "路由枢纽"
  - "API 网关"
  - "Agent 通信"
faq:
  - q: "Gateway 和普通的 API 网关有什么区别？"
    a: "OpenClaw Gateway 专为 AI Agent 场景设计，除了常规的请求路由，还内置了 LLM 调用代理、会话上下文管理和多通道协议适配能力。"
  - q: "Gateway 支持哪些部署方式？"
    a: "Gateway 支持通过 launchd（macOS）、systemd（Linux）等方式以守护进程形式运行，也可以在 Docker 容器中部署。"
  - q: "一个 Gateway 可以管理多个 Agent 吗？"
    a: "可以。Gateway 作为统一入口，能够将请求路由到不同的 Agent 实例，实现多 Agent 的集中管理。"
---

## Gateway 是什么

Gateway 是 OpenClaw 架构中的中央路由枢纽。所有进出 Agent 的流量都经过 Gateway，它负责将来自不同 Channel 的请求统一接收、解析并分发到对应的处理模块。

你可以把 Gateway 理解为 Agent 世界的"前台"——无论请求来自 Telegram、Slack 还是 HTTP API，Gateway 都会统一处理，让后端的 Brain 和 Skills 无需关心消息的来源。

## 核心职责

### 请求路由

Gateway 根据配置规则将请求分发到正确的处理链路。一条来自 Telegram 的消息和一条来自 REST API 的调用，在经过 Gateway 之后会被标准化为统一的内部格式，再交给 Brain 处理。

### LLM 调用代理

Gateway 内置了对主流 LLM 提供商的代理能力。你可以在配置中指定模型端点，Gateway 会负责请求的转发、重试和错误处理。这意味着切换模型提供商时，只需要修改 Gateway 配置，不用改动任何业务逻辑。

### 协议适配

不同的 Channel 使用不同的通信协议——Telegram 用 Webhook，Slack 用 Events API，Discord 有自己的 Gateway 协议。OpenClaw Gateway 将这些差异封装起来，对内部模块暴露统一的接口。

## 配置方式

Gateway 的配置通过 `openclaw.json` 完成，核心配置项包括：

- **监听地址与端口**：默认绑定 `127.0.0.1:18789`
- **模型端点**：指定 LLM 提供商的 API 地址
- **Channel 注册**：声明启用哪些通信通道
- **安全策略**：API Key 验证、速率限制等

### 基本配置示例

```json
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789,
    "model": "anthropic/claude-sonnet-4-6"
  }
}
```

## 运行模式

Gateway 推荐以守护进程方式常驻运行。在 macOS 上可以通过 launchd 管理，在 Linux 上使用 systemd。这样即使机器重启，Gateway 也会自动恢复服务。

详细的守护进程配置请参考[守护进程设置](/zh/docs/daemon-setup)。

## 监控与调试

Gateway 提供了基础的健康检查端点和请求日志。在开发阶段，可以通过提高日志级别来追踪请求的完整生命周期，排查路由或模型调用的问题。

## 下一步

了解 Gateway 如何与 [Brain](/zh/docs/brain) 协作处理请求，或查看 [Channels](/zh/docs/channels) 了解支持的通信通道。

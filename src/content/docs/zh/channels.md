---
title: "Channels：通信通道"
description: "了解 OpenClaw Channels 模块——支持 Telegram、Slack、Discord 等多平台的统一通信层。"
category: "核心概念"
order: 14
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "gateway"
  - "telegram-integration"
  - "system-architecture"
keywords:
  - "Channels"
  - "通信通道"
  - "Telegram"
  - "多平台"
faq:
  - q: "OpenClaw 支持哪些通信通道？"
    a: "目前支持 Telegram、Slack、Discord 以及 HTTP API。通过 Channel 适配器机制，可以方便地扩展新的通道类型。"
  - q: "一个 Agent 可以同时连接多个 Channel 吗？"
    a: "可以。一个 Agent 可以同时在 Telegram、Slack 等多个平台上提供服务，所有消息通过 Gateway 统一路由处理。"
  - q: "如何添加一个新的 Channel 类型？"
    a: "实现 Channel 适配器接口即可。适配器负责将特定平台的消息格式转换为 OpenClaw 的统一内部格式。"
---

## Channels 是什么

Channels 是 OpenClaw 的多平台通信层。Agent 需要与用户交流，而用户分布在不同的平台上——有人用 Telegram，有人用 Slack，有人需要 API 集成。Channels 模块让 Agent 具备"在任何地方对话"的能力。

## 设计理念

Channels 的核心设计理念是**统一抽象**。无论消息来自哪个平台，经过 Channel 适配器处理后，都会被转换为统一的内部消息格式。Brain 和 Skills 只需要处理这种标准格式，完全不用关心消息的原始来源。

这种设计的好处是：

- 新增一个平台，只需要写一个适配器
- Agent 的核心逻辑与通信渠道完全解耦
- 跨平台的一致性体验

## 支持的通道

### Telegram

Telegram 是 OpenClaw 社区最常用的通道。通过 Bot API 和 Webhook 机制，Agent 可以在 Telegram 中实时响应用户消息，支持文字、图片、文件等多种消息类型。

详细配置请参考 [Telegram 集成指南](/zh/docs/telegram-integration)。

### Slack

Slack 通道基于 Events API 实现，适合团队协作场景。Agent 可以加入指定频道，响应 @ 提及或直接消息。

### Discord

Discord 通道适合社区运营场景，Agent 可以作为 Bot 加入服务器，在指定频道中提供服务。

### HTTP API

HTTP API 是最基础的通道，适合程序化集成。通过 REST 接口直接与 Agent 通信，方便与已有系统对接。

## 消息流转

```
用户消息 → Channel 适配器 → Gateway → Brain → 回复生成 → Gateway → Channel 适配器 → 用户
```

整个流转过程中，Channel 适配器在两端完成格式转换工作，中间的处理链路完全标准化。

## 配置 Channel

在 `openclaw.json` 中注册 Channel：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "your-bot-token"
    },
    "http": {
      "enabled": true,
      "port": 18790
    }
  }
}
```

## 下一步

查看 [Telegram 集成指南](/zh/docs/telegram-integration) 了解最常用通道的详细配置，或了解 [Gateway](/zh/docs/gateway) 如何统一管理所有通道的流量。

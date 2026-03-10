---
title: "Telegram 集成指南"
description: "手把手教你将 OpenClaw Agent 接入 Telegram，实现 24/7 智能机器人服务。"
category: "实战指南"
order: 30
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "channels"
  - "gateway"
  - "daemon-setup"
keywords:
  - "Telegram"
  - "机器人"
  - "Bot"
  - "集成指南"
faq:
  - q: "需要 Telegram 付费账号吗？"
    a: "不需要。Telegram Bot API 完全免费，只需要一个普通 Telegram 账号就可以创建 Bot。"
  - q: "Agent 可以处理图片和文件吗？"
    a: "可以。OpenClaw 的 Telegram Channel 支持文字、图片、文件等多种消息类型，Brain 可以根据消息类型调用对应的处理逻辑。"
  - q: "如何限制 Bot 只响应特定用户？"
    a: "可以在 Channel 配置中设置允许列表（allowlist），只有列表中的用户 ID 发送的消息才会被处理。"
---

## 概述

Telegram 是 OpenClaw 社区最流行的通信通道。它具有稳定的 Bot API、良好的消息格式支持和全球可达性，非常适合作为 Agent 的主要交互界面。

本指南将带你完成从创建 Bot 到实现 Agent 全天候服务的完整流程。

## 前置准备

- 一个正在运行的 OpenClaw Gateway 实例
- Telegram 账号
- 能够访问 Telegram API 的网络环境

## 第一步：创建 Telegram Bot

1. 在 Telegram 中搜索 `@BotFather` 并发起对话
2. 发送 `/newbot` 命令
3. 按提示设置 Bot 名称和用户名
4. 获取 Bot Token（格式类似 `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`）

妥善保管这个 Token，它是 Bot 的身份凭证。

## 第二步：配置 OpenClaw

在 `openclaw.json` 中添加 Telegram Channel 配置：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "你的Bot Token",
      "webhook": {
        "url": "https://your-domain.com/webhook/telegram",
        "port": 18789
      },
      "allowlist": [123456789]
    }
  }
}
```

### 配置说明

- **token**：BotFather 提供的 Bot Token
- **webhook.url**：接收 Telegram 推送的公网 URL
- **webhook.port**：Webhook 监听端口
- **allowlist**：可选，限制响应的用户 ID 列表

## 第三步：设置 Webhook

如果你的机器有公网 IP 或使用了内网穿透，OpenClaw 会在启动时自动注册 Webhook。你也可以手动注册：

```bash
openclaw channel telegram setup
```

对于本地开发环境，可以使用轮询模式替代 Webhook：

```json
{
  "channels": {
    "telegram": {
      "mode": "polling"
    }
  }
}
```

## 第四步：测试

启动 Gateway 后，在 Telegram 中向你的 Bot 发送一条消息。如果一切配置正确，Agent 应该会在几秒内回复。

## 高级配置

### 消息格式

Agent 回复默认支持 Markdown 格式，在 Telegram 中会被正确渲染。包括粗体、斜体、代码块和链接等。

### 群组支持

Bot 可以被添加到群组中，通过 @ 提及来触发 Agent 响应。需要在 BotFather 中开启群组隐私模式。

### 定时消息

结合[定时任务](/zh/docs/cron-tasks)功能，Agent 可以主动向指定用户或群组发送消息，实现每日问候、数据报告等场景。

## 常见问题排查

- **Bot 没有回复**：检查 Token 是否正确，Gateway 是否运行中
- **Webhook 注册失败**：确认公网 URL 可达且 HTTPS 证书有效
- **回复延迟过高**：检查 LLM 提供商的响应速度

## 下一步

了解[定时任务](/zh/docs/cron-tasks)设置 Agent 的主动推送能力，或查看 [Channels](/zh/docs/channels) 了解其他通道的集成方式。

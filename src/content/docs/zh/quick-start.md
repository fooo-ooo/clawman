---
title: "快速开始"
description: "5 分钟内启动你的第一个 OpenClaw Agent。"
category: "入门"
order: 4
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "what-is-openclaw"
  - "installation-guide"
keywords:
  - "OpenClaw 快速开始"
  - "第一个 Agent"
  - "OpenClaw 教程"
---

## 快速开始

5 分钟内启动你的第一个 OpenClaw Agent。

### 1. 初始化配置

```bash
openclaw init
```

这将在 `~/.openclaw/openclaw.json` 创建默认配置。

### 2. 配置模型提供商

编辑配置文件，添加你的 LLM 提供商：

```json
{
  "brain": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-6"
  }
}
```

### 3. 启动网关

```bash
openclaw start
```

网关默认在 `127.0.0.1:18789` 启动。

### 4. 连接通道

添加 Telegram 机器人或其他通道，开始与你的 Agent 交互：

```bash
openclaw channel add telegram --token YOUR_BOT_TOKEN
```

### 5. 测试你的 Agent

向机器人发送消息，观察它的回复。你的第一个 Agent 已上线！

## 接下来

- 了解[核心概念](/zh/docs/what-is-openclaw)，理解架构
- 探索 [ClawHub 上的技能](/zh/docs/)，扩展 Agent 能力
- 设置[定时任务](/zh/docs/)，实现自动化运行

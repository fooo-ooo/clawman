---
title: "Quick Start"
description: "Get your first OpenClaw agent running in under 5 minutes with this quick start guide."
category: "Getting Started"
order: 4
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs:
  - "what-is-openclaw"
  - "installation-guide"
keywords:
  - "OpenClaw quick start"
  - "first agent"
  - "OpenClaw tutorial"
---

## Quick Start

Get your first OpenClaw agent running in under 5 minutes.

### 1. Initialize Configuration

```bash
openclaw init
```

This creates the default configuration at `~/.openclaw/openclaw.json`.

### 2. Configure Your Model Provider

Edit the configuration to add your LLM provider:

```json
{
  "brain": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-6"
  }
}
```

### 3. Start the Gateway

```bash
openclaw start
```

The gateway will start on `127.0.0.1:18789` by default.

### 4. Connect a Channel

Add a Telegram bot or other channel to start interacting with your agent:

```bash
openclaw channel add telegram --token YOUR_BOT_TOKEN
```

### 5. Test Your Agent

Send a message to your bot and watch it respond. Your first agent is live!

## What's Next?

- Learn about [Core Concepts](/en/docs/what-is-openclaw) to understand the architecture
- Explore [Skills on ClawHub](/en/docs/) to extend your agent's capabilities
- Set up [Cron Tasks](/en/docs/) for scheduled operations

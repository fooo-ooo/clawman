---
title: "OpenClaw Channels: 20+ Platform Integrations for Your AI Agent"
description: "Discover how OpenClaw Channels connect your AI agent to Telegram, Slack, Discord, and 20+ other platforms through a unified interface."
category: "Core Concepts"
order: 14
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [gateway, telegram-integration, brain, system-architecture]
keywords: [openclaw channels, platform integrations, telegram bot, slack bot, discord bot, ai agent deployment, multi-platform]
faq:
  - q: "How many platforms can I connect to a single agent?"
    a: "There is no hard limit. A single OpenClaw agent can serve messages from all configured channels simultaneously. Each channel operates independently through the Gateway."
  - q: "Do I need to write different code for each channel?"
    a: "No. Channels abstract away platform-specific details. Your agent logic, skills, and prompts remain the same regardless of which channel the message arrives from."
  - q: "Can I add a custom channel for a platform not yet supported?"
    a: "Yes. OpenClaw provides a channel adapter interface that you can implement for any platform with an API. Custom channels plug into the Gateway just like built-in ones."
---

## What Are Channels?

Channels are the connection points between your OpenClaw agent and the outside world. Each channel represents an integration with a specific platform or protocol, allowing users to interact with your agent wherever they already are.

When a user sends a message through Telegram, or a webhook fires from a web application, it is the Channel layer that receives that input, normalizes it, and passes it to the Gateway for routing.

## Supported Platforms

OpenClaw supports 20+ channels out of the box, spanning major categories:

### Messaging Platforms
- **Telegram** -- Full bot API support, inline keyboards, media handling.
- **Slack** -- Workspace apps, slash commands, thread conversations.
- **Discord** -- Server bots, slash commands, channel-specific agents.
- **WhatsApp** -- Via Business API integration.
- **WeChat** -- Official account and mini-program support.

### Developer Tools
- **HTTP/REST** -- A generic webhook endpoint for custom integrations.
- **WebSocket** -- Real-time bidirectional communication.
- **CLI** -- Direct terminal interaction for development and testing.

### Business Platforms
- **Email** -- Inbound email processing and response.
- **Microsoft Teams** -- Enterprise workspace integration.
- **Notion** -- Page and database interactions.

### Social and Web
- **Twitter/X** -- Mention and DM handling.
- **Web widget** -- Embeddable chat widget for websites.

## How Channels Work

Each channel follows a consistent lifecycle:

1. **Connection** -- The channel establishes a connection to its platform (polling, webhook, or persistent socket).
2. **Message ingestion** -- Incoming messages are received and normalized into a common format.
3. **Gateway dispatch** -- The normalized message is forwarded to the Gateway.
4. **Response delivery** -- When the Brain produces a response, the channel translates it back into the platform's native format and sends it.

This normalization layer is what makes OpenClaw truly multi-platform. A single agent configuration works identically whether the user is on Telegram or Slack.

## Channel Configuration

Channels are configured in your `openclaw.json` file. Each channel entry specifies the platform type, authentication credentials, and any platform-specific settings.

```json
{
  "channels": [
    {
      "type": "telegram",
      "token": "YOUR_BOT_TOKEN",
      "allowed_users": ["user_id_1"]
    },
    {
      "type": "slack",
      "app_token": "xapp-...",
      "bot_token": "xoxb-..."
    }
  ]
}
```

## Platform-Specific Features

While the core message flow is standardized, channels preserve platform-specific capabilities where possible:

- **Rich media** -- Images, files, and videos are handled natively per platform.
- **Interactive elements** -- Buttons, menus, and inline keyboards work on platforms that support them.
- **Threading** -- Platforms like Slack and Discord that support threaded conversations maintain thread context.

## Building Custom Channels

If your platform is not supported, you can build a custom channel adapter. The adapter needs to implement a standard interface: receiving messages, normalizing them, and delivering responses. Once implemented, it registers with the Gateway like any built-in channel.

This extensibility ensures OpenClaw can reach any platform with a programmable API.

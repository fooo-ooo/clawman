---
title: "How to Integrate OpenClaw with Telegram: Step-by-Step Guide"
description: "A complete step-by-step guide to connecting your OpenClaw AI agent to Telegram, from creating a bot to deploying it as a persistent service."
category: "Guides"
order: 30
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [channels, gateway, daemon-setup, cron-tasks]
keywords: [openclaw telegram, telegram bot, telegram integration, ai telegram bot, openclaw guide, telegram setup]
faq:
  - q: "Do I need a Telegram Premium account to create a bot?"
    a: "No. Any Telegram account can create bots through BotFather. There is no cost to create or operate a Telegram bot."
  - q: "Can my Telegram bot handle images and files?"
    a: "Yes. OpenClaw's Telegram channel adapter supports receiving and sending images, documents, voice messages, and other media types natively."
  - q: "How do I restrict who can talk to my bot?"
    a: "Use the allowed_users field in your Telegram channel configuration to specify a list of authorized Telegram user IDs. Messages from other users will be ignored."
---

## Overview

Telegram is one of the most popular platforms for deploying AI agents. Its Bot API is well-documented, there are no hosting fees, and bots can operate in private chats, groups, and channels. This guide walks you through connecting an OpenClaw agent to Telegram from scratch.

## Prerequisites

Before starting, make sure you have:

- OpenClaw installed and configured on your machine.
- A Telegram account.
- Basic familiarity with editing JSON configuration files.

## Step 1: Create a Telegram Bot

Every Telegram bot starts with BotFather, Telegram's official bot management tool.

1. Open Telegram and search for **@BotFather**.
2. Send the command `/newbot`.
3. Follow the prompts to choose a display name and username for your bot.
4. BotFather will respond with a **bot token** -- a long string that looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`. Save this securely.

The bot token is your bot's authentication credential. Do not share it publicly.

## Step 2: Configure the Channel in OpenClaw

Open your `openclaw.json` configuration file and add a Telegram channel entry:

```json
{
  "channels": [
    {
      "type": "telegram",
      "token": "YOUR_BOT_TOKEN_HERE",
      "allowed_users": ["your_telegram_user_id"]
    }
  ]
}
```

### Finding Your User ID

To find your Telegram user ID, you can message a bot like @userinfobot on Telegram, which will reply with your numeric user ID.

### Optional Settings

- **`allowed_users`** -- An array of Telegram user IDs permitted to interact with the bot. If omitted, anyone can use the bot.
- **`parse_mode`** -- Set to `"markdown"` or `"html"` to control how the bot formats its responses.

## Step 3: Configure the Brain

Ensure your Brain is configured with a model and API credentials:

```json
{
  "brain": {
    "default_model": "anthropic/claude-sonnet-4-6",
    "api_base": "https://api.anthropic.com/v1",
    "api_key": "YOUR_API_KEY"
  }
}
```

## Step 4: Start OpenClaw

Start your OpenClaw agent:

```bash
openclaw start
```

If you have configured daemon mode, OpenClaw will run in the background. Otherwise, it will run in the foreground until you stop it.

## Step 5: Test Your Bot

Open Telegram, find your bot by its username, and send it a message. If everything is configured correctly, the bot should respond within a few seconds.

### Troubleshooting

- **No response:** Check that the bot token is correct and that OpenClaw is running. Review the logs for errors.
- **"Unauthorized" errors:** Verify your allowed_users list includes your Telegram user ID.
- **Slow responses:** Response time depends on your LLM provider. Cloud models add network latency. Using a proxy service may add additional delay.

## Step 6: Deploy as a Persistent Service

For 24/7 operation, set up OpenClaw as a system daemon. On macOS, this means a launchd plist; on Linux, a systemd unit file. See the [Daemon Setup](/en/daemon-setup) guide for full instructions.

## Advanced: Group Chat Support

Your bot can also operate in Telegram group chats. Add the bot to a group and it will respond when mentioned by username or when configured trigger words are detected. Group mode requires that the bot has the appropriate privacy settings configured through BotFather (use `/setprivacy` to toggle group message access).

## Next Steps

- Set up [scheduled tasks](/en/cron-tasks) so your bot sends proactive messages.
- Add [skills](/en/skills) to extend what your bot can do.
- Configure additional [channels](/en/channels) so your agent is reachable on other platforms too.

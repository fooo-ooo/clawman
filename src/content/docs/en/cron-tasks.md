---
title: "Setting Up Cron and Scheduled Tasks in OpenClaw"
description: "Learn how to configure cron jobs and scheduled tasks in OpenClaw for automated greetings, reports, reminders, and recurring agent actions."
category: "Guides"
order: 31
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [telegram-integration, daemon-setup, brain, channels]
keywords: [openclaw cron, scheduled tasks, cron jobs, automated messages, recurring tasks, openclaw scheduling]
faq:
  - q: "What timezone do cron schedules use?"
    a: "You can specify a timezone for each cron task in the configuration. If no timezone is set, the system's local timezone is used."
  - q: "Can a cron task send messages to a specific channel?"
    a: "Yes. Each cron task can specify a target channel and recipient. For example, a morning greeting can be sent to a specific Telegram user or Slack channel."
  - q: "What happens if the LLM call fails during a scheduled task?"
    a: "OpenClaw will log the failure. Depending on your configuration, it may retry the task or skip it and wait for the next scheduled run. Configuring a fallback model can reduce failures."
---

## Overview

Scheduled tasks let your OpenClaw agent act proactively rather than just reactively. Instead of waiting for a user to send a message, the agent can initiate actions on a schedule: sending morning greetings, generating daily reports, checking external services, or performing routine maintenance.

## How Scheduling Works

OpenClaw includes a built-in cron scheduler that runs alongside the agent daemon. Tasks are defined in your configuration file with a schedule expression, a prompt or action, and a target channel for output.

When a scheduled task triggers:

1. The scheduler generates an internal message based on the task's prompt.
2. This message is dispatched to the Brain through the normal processing pipeline.
3. The Brain processes it (including any skill calls) and produces a response.
4. The response is delivered to the configured target channel.

From the Brain's perspective, a cron task looks just like a user message -- it goes through the same reasoning and skill pipeline.

## Configuration

Scheduled tasks are defined in the `cron` section of your `openclaw.json`:

```json
{
  "cron": [
    {
      "name": "Morning Greeting",
      "schedule": "30 9 * * *",
      "timezone": "Asia/Shanghai",
      "prompt": "Send a friendly good morning greeting with a brief weather summary.",
      "channel": "telegram",
      "target": "user_id_here"
    }
  ]
}
```

### Schedule Format

The `schedule` field uses standard cron syntax:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, Sunday=0)
│ │ │ │ │
* * * * *
```

### Common Schedule Examples

| Schedule | Expression |
|---|---|
| Every day at 9:30 AM | `30 9 * * *` |
| Every hour | `0 * * * *` |
| Every Monday at 8 AM | `0 8 * * 1` |
| Every 30 minutes | `*/30 * * * *` |
| First day of each month | `0 10 1 * *` |

## Model Selection for Cron Tasks

Scheduled tasks do not always need the most capable (or most expensive) model. You can specify a per-task model override to control costs:

```json
{
  "cron": [
    {
      "name": "Daily Summary",
      "schedule": "0 18 * * *",
      "prompt": "Summarize today's key events.",
      "model": "anthropic/claude-haiku-3",
      "channel": "telegram",
      "target": "user_id_here"
    }
  ]
}
```

Using a smaller, faster model for routine tasks like greetings or simple summaries can significantly reduce API costs while reserving more capable models for interactive conversations.

## Practical Examples

### Morning Greeting

A daily good morning message sent to your Telegram:

```json
{
  "name": "Good Morning",
  "schedule": "30 9 * * *",
  "timezone": "Asia/Shanghai",
  "prompt": "Greet the user with a warm good morning message. Be brief and friendly.",
  "channel": "telegram",
  "target": "123456789"
}
```

### Weekly Report

A weekly summary sent every Friday afternoon:

```json
{
  "name": "Weekly Report",
  "schedule": "0 17 * * 5",
  "prompt": "Generate a summary of this week's conversations and completed tasks.",
  "channel": "slack",
  "target": "#reports"
}
```

### Health Check

A periodic check that your services are running:

```json
{
  "name": "Service Health Check",
  "schedule": "*/30 * * * *",
  "prompt": "Check the status of configured services and report any issues.",
  "channel": "telegram",
  "target": "123456789"
}
```

## Cron Tasks with Skills

Scheduled tasks have access to the same skills as interactive conversations. A cron task's prompt can trigger skill calls -- for example, fetching data from an API, reading a file, or querying a database -- just as if a user had made the request.

## Debugging Scheduled Tasks

If a scheduled task is not firing as expected:

- Verify the cron expression with an online tool like crontab.guru.
- Check that the OpenClaw daemon is running.
- Review the logs for any scheduling or execution errors.
- Ensure the target channel and recipient are correctly configured.
- Confirm your timezone setting matches your expectations.

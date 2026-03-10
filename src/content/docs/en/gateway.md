---
title: "OpenClaw Gateway: The Routing Hub for AI Agents"
description: "Learn how the OpenClaw Gateway routes messages, manages channels, and handles load balancing for your AI agent infrastructure."
category: "Core Concepts"
order: 10
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [brain, channels, system-architecture, daemon-setup]
keywords: [openclaw gateway, ai agent routing, message routing, load balancing, api gateway, agent infrastructure]
faq:
  - q: "What port does the OpenClaw Gateway listen on by default?"
    a: "The Gateway listens on 127.0.0.1:18789 by default. You can change this in your openclaw.json configuration file."
  - q: "Can the Gateway handle multiple channels simultaneously?"
    a: "Yes. The Gateway is designed to route messages from any number of connected channels concurrently, dispatching each to the appropriate Brain instance."
  - q: "Does the Gateway support authentication?"
    a: "Yes. The Gateway supports token-based authentication for incoming requests, ensuring only authorized channels and clients can interact with your agent."
---

## What Is the Gateway?

The Gateway is the central routing hub in the OpenClaw architecture. Every message flowing into or out of your AI agent passes through the Gateway. It acts as a reverse proxy, dispatcher, and traffic controller all in one, ensuring that incoming requests from channels like Telegram, Slack, or HTTP endpoints reach the correct Brain instance and that responses are routed back to the right destination.

Think of it as the front door to your agent: it decides what comes in, where it goes, and how fast it gets there.

## How Message Routing Works

When a message arrives at the Gateway, it goes through a lightweight processing pipeline:

1. **Authentication** -- The Gateway verifies the request against configured credentials or tokens.
2. **Channel identification** -- It determines which channel (Telegram, Discord, HTTP, etc.) originated the message.
3. **Context resolution** -- The Gateway attaches session and conversation metadata so the Brain has full context.
4. **Dispatch** -- The message is forwarded to the designated Brain instance for processing.
5. **Response relay** -- Once the Brain produces a response, the Gateway routes it back through the originating channel.

This pipeline runs with minimal latency, typically adding only a few milliseconds of overhead.

## Load Balancing

For production deployments handling significant traffic, the Gateway includes built-in load balancing capabilities. You can configure multiple Brain backends, and the Gateway will distribute incoming requests across them.

### Supported Strategies

- **Round-robin** -- Requests are distributed evenly across available backends in sequence.
- **Least-connections** -- New requests are sent to the backend with the fewest active connections.
- **Priority-based** -- You can assign priority weights to backends, useful when mixing high-performance and fallback models.

This means you can, for example, route most traffic to a fast model while keeping a more capable model available for complex queries.

## Configuration

The Gateway is configured through your `openclaw.json` file. Key settings include:

- **Bind address and port** -- Where the Gateway listens for incoming connections.
- **Backend definitions** -- Which Brain instances are available and how to reach them.
- **Channel registrations** -- Which channels are active and their authentication details.
- **Rate limiting** -- Optional throttling to prevent abuse or runaway costs.

### Example Snippet

```json
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789,
    "backends": [
      { "name": "primary", "provider": "anthropic", "priority": 1 }
    ]
  }
}
```

## Running as a Service

In most setups, the Gateway runs as a persistent background service. On macOS it integrates with launchd; on Linux it works with systemd. This ensures your agent is always reachable, even after reboots. See the [Daemon Setup](/en/daemon-setup) guide for detailed instructions.

## When to Scale the Gateway

For personal or small-team use, a single Gateway instance is more than sufficient. Consider scaling when you are handling hundreds of concurrent conversations across multiple channels or when you need geographic distribution for lower latency.

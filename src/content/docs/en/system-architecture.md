---
title: "OpenClaw System Architecture: How the Components Work Together"
description: "A complete overview of the OpenClaw system architecture, including Gateway, Brain, Memory, Skills, and Channels and how they interact."
category: "Architecture"
order: 20
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [gateway, brain, memory, skills, channels, daemon-setup]
keywords: [openclaw architecture, system design, component overview, gateway, brain, memory, skills, channels, agent architecture]
faq:
  - q: "Can I run OpenClaw components on separate machines?"
    a: "OpenClaw is designed to run as a single process on one machine for simplicity. For advanced deployments, the Gateway can be configured to route to Brain instances on different hosts, but this is not the default setup."
  - q: "What happens if one component fails?"
    a: "OpenClaw is designed to fail gracefully. If a skill fails, the Brain reports the error and continues. If the Brain cannot reach the LLM provider, it tries the fallback. The daemon manager restarts the process if it crashes entirely."
  - q: "How does OpenClaw compare to microservice architectures?"
    a: "OpenClaw uses a modular monolith design. Components are logically separated but run in a single process. This gives you the clarity of separated concerns without the complexity of distributed systems."
---

## Overview

OpenClaw's architecture is built around five core components that work together to deliver a persistent, intelligent AI agent. Each component has a clear responsibility, and they communicate through well-defined interfaces. This guide explains what each component does and how data flows between them.

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                   OpenClaw Agent                 │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │
│  │ Telegram  │    │  Slack   │    │ Discord  │   │
│  │ Channel   │    │ Channel  │    │ Channel  │   │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘   │
│       │               │               │          │
│       └───────────────┼───────────────┘          │
│                       │                          │
│                ┌──────┴──────┐                   │
│                │   Gateway   │                   │
│                └──────┬──────┘                   │
│                       │                          │
│                ┌──────┴──────┐                   │
│                │    Brain    │◄──── LLM Provider │
│                └──┬──────┬──┘                    │
│                   │      │                       │
│           ┌───────┘      └───────┐               │
│           │                      │               │
│    ┌──────┴──────┐       ┌──────┴──────┐        │
│    │   Memory    │       │   Skills    │        │
│    └─────────────┘       └─────────────┘        │
│                                                  │
└─────────────────────────────────────────────────┘
```

## Component Breakdown

### Gateway

The Gateway is the entry point for all incoming and outgoing messages. It receives requests from Channels, authenticates them, and dispatches them to the Brain. When the Brain produces a response, the Gateway routes it back to the originating Channel.

Key responsibilities:
- Request authentication and validation.
- Channel-to-Brain message dispatch.
- Load balancing across multiple Brain backends (when configured).
- Rate limiting and traffic management.

Read more: [Gateway](/en/gateway)

### Brain

The Brain is the reasoning engine. It receives messages from the Gateway, assembles context from Memory, calls the configured LLM, orchestrates skill invocations, and produces the final response.

Key responsibilities:
- LLM provider management (primary + fallback).
- Prompt construction with system instructions and context.
- Tool/skill call orchestration.
- Response generation and formatting.

Read more: [Brain](/en/brain)

### Memory

The Memory system provides persistence and context management. It stores conversation history, session metadata, and tool call records. The Brain queries Memory at the start of every request to assemble relevant context.

Key responsibilities:
- Conversation history storage and retrieval.
- Context window management (sliding window, summarization).
- Session and user metadata tracking.
- Local-first data persistence.

Read more: [Memory](/en/memory)

### Skills

Skills are the agent's tools -- MCP plugins that let it interact with the outside world. The Brain discovers available skills, presents them to the LLM, and executes whichever skills the model chooses to invoke.

Key responsibilities:
- Tool registration and discovery.
- Skill execution and result handling.
- Integration with the ClawHub marketplace.
- Security and permission management.

Read more: [Skills](/en/skills)

### Channels

Channels are the platform adapters that connect the agent to the outside world. Each channel handles the specifics of one platform (Telegram's Bot API, Slack's Events API, etc.) and normalizes messages into a common format for the Gateway.

Key responsibilities:
- Platform-specific connection management.
- Message normalization (inbound) and formatting (outbound).
- Rich media and interactive element handling.
- Platform-specific feature support (threads, buttons, etc.).

Read more: [Channels](/en/channels)

## Request Lifecycle

A complete request flows through the system as follows:

1. A user sends a message on Telegram.
2. The **Telegram Channel** receives the message and normalizes it.
3. The **Gateway** authenticates the request and dispatches it to the **Brain**.
4. The **Brain** queries **Memory** for conversation context.
5. The **Brain** assembles a prompt (system instructions + context + user message + available skills) and sends it to the LLM.
6. The LLM responds, possibly requesting a skill call.
7. The **Brain** executes the requested **Skill** and feeds the result back to the LLM.
8. The LLM produces a final response.
9. The **Brain** sends the response to the **Gateway**.
10. The **Gateway** routes it to the **Telegram Channel**.
11. The **Telegram Channel** formats the response and delivers it to the user.
12. **Memory** records the conversation turn.

## Design Principles

- **Local-first.** All data stays on your machine by default.
- **Modular monolith.** Components are logically separated but run in a single process for simplicity.
- **Configuration over code.** The agent is defined in JSON, not in application code.
- **Provider-agnostic.** No lock-in to any single LLM vendor.
- **Fail gracefully.** Component failures are contained and reported, not cascading.

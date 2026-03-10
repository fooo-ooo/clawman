---
title: "OpenClaw Brain: The LLM Engine Powering Your Agent"
description: "Understand the OpenClaw Brain component, including multi-provider LLM support, model switching, and how it processes agent reasoning."
category: "Core Concepts"
order: 11
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [gateway, memory, skills, system-architecture]
keywords: [openclaw brain, llm engine, multi-provider, model switching, anthropic, openai, ai agent reasoning]
faq:
  - q: "Which LLM providers does OpenClaw support?"
    a: "OpenClaw supports Anthropic (Claude), OpenAI (GPT), and any provider offering an OpenAI-compatible API, including local models served via Ollama or vLLM."
  - q: "Can I switch models without changing my agent logic?"
    a: "Yes. The Brain abstracts the provider layer, so you can swap models by changing a single configuration value. Your skills, channels, and prompts remain untouched."
  - q: "What happens if my primary model provider goes down?"
    a: "You can configure fallback providers in your Brain settings. If the primary provider fails or times out, the Brain automatically routes to the next available provider."
---

## What Is the Brain?

The Brain is the reasoning engine at the heart of every OpenClaw agent. It takes incoming messages from the Gateway, processes them through a large language model, orchestrates any required skill calls, and produces a response. While the Gateway handles routing and the Memory handles persistence, the Brain handles thinking.

## Multi-Provider Support

One of the Brain's most important design decisions is provider abstraction. You are never locked into a single LLM vendor. The Brain supports:

- **Anthropic** -- Claude models, from Haiku to Opus.
- **OpenAI** -- GPT models and any OpenAI-compatible endpoint.
- **Local models** -- Self-hosted models through Ollama, vLLM, llama.cpp, or any service exposing an OpenAI-compatible API.
- **Proxy services** -- Third-party API proxies that aggregate multiple providers under a single endpoint.

This flexibility means you can choose models based on cost, speed, capability, or privacy requirements -- and change your mind later without rewriting your agent.

## Model Switching

Switching models in OpenClaw is a configuration change, not a code change. In your `openclaw.json`, you specify the default model:

```json
{
  "brain": {
    "default_model": "anthropic/claude-sonnet-4-6",
    "api_base": "https://api.anthropic.com/v1"
  }
}
```

To switch to a different model, update the `default_model` value and restart the agent. You can also configure per-task model overrides, so a scheduled cron job might use a cheaper model while interactive conversations use a more capable one.

### Fallback Chains

The Brain supports fallback configurations. If your primary provider is unreachable or returns an error, the Brain will automatically try the next provider in the chain. This is particularly useful when relying on third-party APIs that may experience occasional downtime.

```json
{
  "brain": {
    "default_model": "anthropic/claude-sonnet-4-6",
    "fallback": "openai/gpt-4o"
  }
}
```

## How the Brain Processes Requests

When the Brain receives a dispatched message from the Gateway, it follows this flow:

1. **Context assembly** -- The Brain retrieves relevant conversation history from Memory and constructs the prompt context.
2. **Skill resolution** -- If the message might require tool use, the Brain identifies which skills are available and includes their definitions.
3. **LLM call** -- The assembled prompt is sent to the configured model.
4. **Tool execution** -- If the model requests a skill call, the Brain executes it and feeds the result back for further reasoning.
5. **Response generation** -- The final response is returned to the Gateway for delivery.

This loop can repeat multiple times in a single turn if the model needs to call several skills sequentially.

## System Prompts and Agent Identity

The Brain is also where you define your agent's personality and behavior through system prompts. These prompts persist across conversations and shape how the agent responds, what tone it uses, and what boundaries it respects.

You can define system prompts in your configuration or in dedicated prompt files within your workspace directory.

## Performance Considerations

The Brain's response time is largely determined by the underlying LLM. Local models offer the lowest latency but may sacrifice capability. Cloud providers like Anthropic and OpenAI offer the strongest models but introduce network latency. Proxy services add a small additional overhead but can provide cost savings or access to multiple providers through a single key.

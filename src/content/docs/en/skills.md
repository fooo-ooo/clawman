---
title: "OpenClaw Skills: MCP Plugins and the ClawHub Marketplace"
description: "Explore OpenClaw Skills powered by MCP, the ClawHub marketplace with 3200+ plugins, and how to create your own custom skills."
category: "Core Concepts"
order: 13
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs: [brain, channels, system-architecture, telegram-integration]
keywords: [openclaw skills, mcp plugins, clawhub, marketplace, custom skills, tool use, ai agent plugins]
faq:
  - q: "What is MCP and why does OpenClaw use it?"
    a: "MCP (Model Context Protocol) is an open standard for connecting AI models to external tools and data sources. OpenClaw uses MCP because it provides a standardized, interoperable way to define skills that work across different LLM providers."
  - q: "How do I install a skill from ClawHub?"
    a: "You can browse and install skills from ClawHub directly through the OpenClaw CLI or configuration file. Once added, the skill becomes available to your agent immediately."
  - q: "Can I create a skill in any programming language?"
    a: "Yes. Since MCP skills communicate over standard protocols (typically stdio or HTTP), you can implement them in any language. Most community skills are written in Python, TypeScript, or Go."
---

## What Are Skills?

Skills are the hands and tools of your OpenClaw agent. While the Brain handles reasoning and the Memory handles recall, Skills let your agent take action in the world: search the web, read files, call APIs, process images, execute code, and more.

In OpenClaw, skills are implemented as MCP (Model Context Protocol) plugins. MCP is an open standard that defines how AI models interact with external tools. This means OpenClaw skills are not proprietary -- they are interoperable with any MCP-compatible system.

## How Skills Work

When the Brain processes a message and determines that a tool call is needed, it invokes the appropriate skill. The skill executes its logic, returns the result, and the Brain incorporates that result into its ongoing reasoning.

### Skill Lifecycle

1. **Registration** -- Skills are registered in your OpenClaw configuration or discovered from ClawHub.
2. **Discovery** -- The Brain receives a list of available skills and their descriptions at the start of each request.
3. **Invocation** -- The LLM decides to call a skill based on the user's request.
4. **Execution** -- The skill runs, performing its designated action.
5. **Result return** -- The output is passed back to the Brain for further processing.

Skills can be chained: the Brain might call one skill to fetch data, another to process it, and a third to send the result somewhere.

## The ClawHub Marketplace

ClawHub is the community marketplace for OpenClaw skills. With over 3,200 skills available, it covers a broad range of use cases:

- **Productivity** -- Calendar management, email, task tracking.
- **Development** -- Code execution, Git operations, CI/CD triggers.
- **Communication** -- Sending messages across platforms, notifications.
- **Data** -- Web scraping, database queries, file processing.
- **Media** -- Image generation, video processing, audio transcription.

Skills on ClawHub are reviewed by the community and tagged with compatibility information, making it easy to find what you need.

## Creating Custom Skills

Building your own skill is straightforward. A minimal MCP skill needs:

1. **A tool definition** -- A JSON schema describing the skill's name, description, and parameters.
2. **A handler** -- The code that executes when the skill is invoked.
3. **A transport layer** -- Either stdio (for local skills) or HTTP (for remote skills).

### Example Structure

```
my-skill/
  ├── index.ts        # Skill handler
  ├── schema.json     # Tool definition
  └── package.json    # Dependencies
```

The handler receives structured input matching the schema, performs its work, and returns a structured result. OpenClaw manages the communication between the Brain and the skill process.

## Skill Security

Since skills can execute arbitrary code and access external services, security matters. OpenClaw provides several safeguards:

- **Permission scoping** -- Skills can be limited to specific operations or resources.
- **Approval prompts** -- For sensitive operations, the agent can be configured to require user confirmation before executing.
- **Sandboxing** -- Skills can be run in isolated environments to limit their access to the host system.

## Best Practices

- Start with ClawHub skills before building custom ones.
- Keep custom skills focused on a single responsibility.
- Include clear descriptions and parameter documentation so the Brain can invoke them accurately.
- Test skills independently before integrating them with your agent.

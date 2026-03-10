---
title: "Installation Guide"
description: "Step-by-step guide to installing OpenClaw on macOS, Linux, and Windows."
category: "Getting Started"
order: 3
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs:
  - "what-is-openclaw"
  - "quick-start"
keywords:
  - "install OpenClaw"
  - "OpenClaw setup"
  - "OpenClaw macOS"
faq:
  - q: "How do I install OpenClaw on Mac?"
    a: "Install OpenClaw on macOS using npm: npm install -g openclaw. Requires Node.js 20+."
  - q: "What are the system requirements for OpenClaw?"
    a: "OpenClaw requires Node.js 20 or later, 2GB RAM minimum, and works on macOS, Linux, and Windows."
---

## Installation

OpenClaw can be installed via npm on macOS, Linux, and Windows.

### Prerequisites

- Node.js 20 or later
- npm 10 or later
- 2GB RAM minimum (4GB recommended)

### Install via npm

```bash
npm install -g openclaw
```

### Verify Installation

```bash
openclaw --version
```

## Platform-Specific Notes

### macOS

OpenClaw runs natively on both Intel and Apple Silicon Macs. For always-on operation, use launchd to manage the daemon process.

### Linux

Supported on Ubuntu 22.04+, Debian 12+, and most modern distributions. Use systemd for daemon management.

### Windows

Supported on Windows 10/11 with WSL2 recommended for best performance.

## Next Steps

Once installed, follow the [Quick Start](/en/docs/quick-start) guide to configure and launch your first agent.

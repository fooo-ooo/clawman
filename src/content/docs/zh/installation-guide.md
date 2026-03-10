---
title: "安装指南"
description: "在 macOS、Linux 和 Windows 上安装 OpenClaw 的分步指南。"
category: "入门"
order: 3
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "what-is-openclaw"
  - "quick-start"
keywords:
  - "安装 OpenClaw"
  - "OpenClaw 设置"
  - "OpenClaw macOS"
faq:
  - q: "如何在 Mac 上安装 OpenClaw？"
    a: "通过 npm 在 macOS 上安装 OpenClaw：npm install -g openclaw。需要 Node.js 20+。"
  - q: "OpenClaw 的系统要求是什么？"
    a: "OpenClaw 需要 Node.js 20 或更高版本，最低 2GB 内存，支持 macOS、Linux 和 Windows。"
---

## 安装

OpenClaw 可通过 npm 在 macOS、Linux 和 Windows 上安装。

### 前置要求

- Node.js 20 或更高版本
- npm 10 或更高版本
- 最低 2GB 内存（推荐 4GB）

### 通过 npm 安装

```bash
npm install -g openclaw
```

### 验证安装

```bash
openclaw --version
```

## 平台说明

### macOS

OpenClaw 在 Intel 和 Apple Silicon Mac 上原生运行。如需常驻运行，使用 launchd 管理守护进程。

### Linux

支持 Ubuntu 22.04+、Debian 12+ 及大多数现代发行版。使用 systemd 管理守护进程。

### Windows

支持 Windows 10/11，推荐使用 WSL2 以获得最佳性能。

## 下一步

安装完成后，请查看[快速开始](/zh/docs/quick-start)指南，配置并启动你的第一个 Agent。

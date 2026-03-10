---
title: "系统架构概览"
description: "OpenClaw 系统架构全景解析——Gateway、Brain、Memory、Skills、Channels 五大模块的协作机制。"
category: "架构"
order: 20
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "gateway"
  - "brain"
  - "memory"
  - "skills"
  - "channels"
keywords:
  - "系统架构"
  - "架构设计"
  - "模块化"
  - "Agent 运行时"
faq:
  - q: "OpenClaw 的最小部署包含哪些组件？"
    a: "最小部署只需要 Gateway 和 Brain 两个核心组件，加上至少一个 Channel。Memory 和 Skills 可以根据需求按需启用。"
  - q: "OpenClaw 支持分布式部署吗？"
    a: "各模块通过标准接口通信，理论上可以独立部署。但对于大多数场景，单机部署已经足够满足需求。"
  - q: "架构可以水平扩展吗？"
    a: "Gateway 层可以通过负载均衡实现水平扩展。Brain 和 Skills 作为无状态组件，也可以按需扩容。Memory 的扩展取决于存储方案的选择。"
---

## 架构全景

OpenClaw 采用模块化架构设计，由五大核心模块组成：

```
┌─────────────────────────────────────────┐
│              Channels                    │
│   (Telegram / Slack / Discord / HTTP)    │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│              Gateway                     │
│        (路由枢纽 / 协议适配)              │
└──────┬───────────────────────┬──────────┘
       │                       │
┌──────▼──────┐        ┌──────▼──────┐
│    Brain    │◄──────►│   Memory    │
│  (LLM 引擎) │        │  (记忆系统)  │
└──────┬──────┘        └─────────────┘
       │
┌──────▼──────┐
│   Skills    │
│ (MCP 插件)   │
└─────────────┘
```

每个模块职责清晰，通过标准接口相互通信。这种设计让各模块可以独立迭代，也方便根据需求灵活组合。

## 请求处理流程

一条典型的用户请求经历以下生命周期：

1. **接入**：用户通过某个 Channel（如 Telegram）发送消息
2. **路由**：Gateway 接收消息，完成协议适配和格式标准化
3. **上下文加载**：Brain 从 Memory 获取相关的历史上下文
4. **推理**：Brain 调用 LLM 进行推理，可能触发工具调用
5. **工具执行**：Skills 模块执行被调用的工具，返回结果给 Brain
6. **多轮推理**：Brain 可能基于工具结果进行多轮推理
7. **回复**：最终回复通过 Gateway 返回给对应的 Channel
8. **记忆更新**：本次交互的关键信息被写入 Memory

## 设计原则

### 本地优先

OpenClaw 坚持本地优先的理念。Agent 运行在你自己的机器上，数据存储在本地，不依赖任何中心化服务（LLM API 除外）。这保证了数据隐私和系统自主性。

### 模块解耦

每个模块只关注自己的核心职责，通过定义良好的接口与其他模块交互。替换任何一个模块的实现都不会影响其他模块的正常运行。

### 配置驱动

系统行为通过配置文件控制。从模型选择到 Channel 配置，从定时任务到安全策略，都可以通过修改 `openclaw.json` 来调整，无需修改代码。

## 运行环境

OpenClaw 典型的运行环境是一台长期在线的机器，例如：

- Mac mini 作为个人 Agent 服务器
- 云服务器用于团队 Agent 部署
- 树莓派等小型设备用于边缘场景

核心要求是稳定的网络连接和足够的运行时间——Agent 需要"永远在线"才能发挥最大价值。

## 下一步

深入了解各个模块：[Gateway](/zh/docs/gateway) | [Brain](/zh/docs/brain) | [Memory](/zh/docs/memory) | [Skills](/zh/docs/skills) | [Channels](/zh/docs/channels)

或查看[守护进程设置](/zh/docs/daemon-setup)了解如何保证 Agent 持续运行。

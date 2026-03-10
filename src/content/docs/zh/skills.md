---
title: "Skills：MCP 插件系统"
description: "了解 OpenClaw Skills 模块——基于 MCP 协议的可扩展插件系统，让 Agent 具备操作外部世界的能力。"
category: "核心概念"
order: 13
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "brain"
  - "gateway"
  - "telegram-integration"
keywords:
  - "Skills"
  - "MCP"
  - "插件系统"
  - "工具调用"
faq:
  - q: "什么是 MCP？"
    a: "MCP（Model Context Protocol）是一个标准化的模型上下文协议，定义了 LLM 与外部工具之间的通信规范。OpenClaw 基于 MCP 实现了插件系统。"
  - q: "如何开发自定义 Skill？"
    a: "自定义 Skill 只需实现 MCP 接口规范，定义工具的名称、参数描述和执行逻辑，然后在 OpenClaw 配置中注册即可。"
  - q: "Skill 执行失败会影响 Agent 运行吗？"
    a: "不会。Skill 的执行结果会被返回给 Brain，即使某个工具调用失败，Brain 也能根据错误信息调整策略，不会导致整个 Agent 崩溃。"
---

## Skills 是什么

Skills 是 OpenClaw 的插件扩展系统，基于 MCP（Model Context Protocol）协议构建。如果说 Brain 是 Agent 的大脑，那么 Skills 就是 Agent 的双手——让它能够实际操作外部世界。

通过 Skills，Agent 可以读写文件、调用 API、操作浏览器、执行代码、管理数据库，几乎可以做到任何事情。

## MCP 协议

MCP 是 Anthropic 提出的模型上下文协议，定义了 LLM 与外部工具之间标准化的交互方式。OpenClaw 全面拥抱 MCP 生态，这意味着：

- 社区中已有的 MCP 工具可以直接接入
- 自己开发的 Skill 也可以被其他 MCP 兼容系统使用
- 工具的输入输出格式统一，降低了开发和调试成本

## 工具调用流程

1. 用户发送请求到 Gateway
2. Brain 分析请求，判断需要调用哪些工具
3. Brain 生成工具调用指令（包含参数）
4. Skills 模块执行对应工具，返回结果
5. Brain 根据执行结果继续推理或直接回复

这个过程可以多轮迭代——Brain 可能需要连续调用多个工具才能完成一个复杂任务。

## 内置 Skills

OpenClaw 提供了一些常用的内置 Skill：

- **文件操作**：读写本地文件系统
- **网络请求**：HTTP 调用和网页抓取
- **代码执行**：在沙箱中运行代码片段
- **搜索**：网络搜索和本地文件搜索

## 自定义 Skill 开发

开发一个自定义 Skill 需要定义工具的元信息和执行逻辑：

```json
{
  "name": "my_tool",
  "description": "描述这个工具做什么",
  "parameters": {
    "type": "object",
    "properties": {
      "input": {
        "type": "string",
        "description": "输入参数说明"
      }
    }
  }
}
```

Skill 以独立进程运行，通过标准输入输出与 OpenClaw 通信，语言不限。

## 安全考量

Skills 的执行涉及外部操作，安全性至关重要：

- **权限控制**：可以限制 Skill 的文件系统访问范围
- **沙箱执行**：代码执行类 Skill 在隔离环境中运行
- **审批机制**：高风险操作可以配置为需要用户确认

## 下一步

查看 [Telegram 集成指南](/zh/docs/telegram-integration) 了解 Channel 类 Skill 的实际应用，或回顾 [Brain](/zh/docs/brain) 了解工具调用的编排逻辑。

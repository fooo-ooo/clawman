---
title: "定时任务设置"
description: "配置 OpenClaw 的定时任务系统——让 Agent 按计划自动执行任务，实现主动服务。"
category: "实战指南"
order: 31
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "telegram-integration"
  - "daemon-setup"
  - "brain"
keywords:
  - "定时任务"
  - "Cron"
  - "自动化"
  - "计划任务"
faq:
  - q: "定时任务支持什么时间格式？"
    a: "支持标准的 Cron 表达式以及人类友好的描述方式，如 'every day at 9:30' 或 '0 30 9 * * *'。还支持时区配置。"
  - q: "定时任务失败了怎么办？"
    a: "任务执行结果会被记录在日志中。可以配置失败重试策略，也可以通过 Telegram 等 Channel 接收失败通知。"
  - q: "可以动态添加定时任务吗？"
    a: "可以。支持通过配置文件静态定义，也支持在运行时通过命令动态添加、修改和删除定时任务。"
---

## 概述

定时任务是 Agent 从"被动响应"进化到"主动服务"的关键能力。通过 Cron 模块，Agent 可以在指定时间自动执行任务——发送早安问候、生成日报、定期检查系统状态、同步数据等。

一个真正有用的 Agent 不应该只在你找它时才响应，它应该主动为你工作。

## 基本配置

在 `openclaw.json` 中定义定时任务：

```json
{
  "cron": [
    {
      "name": "早安问候",
      "schedule": "0 30 9 * * *",
      "timezone": "Asia/Shanghai",
      "action": {
        "type": "prompt",
        "content": "用温暖的方式和用户打个招呼，分享一个今日小知识。",
        "channel": "telegram"
      }
    }
  ]
}
```

### 配置字段说明

- **name**：任务名称，用于日志和管理
- **schedule**：Cron 表达式，支持秒级精度
- **timezone**：任务执行的时区
- **action.type**：任务类型，`prompt` 表示发送提示词给 Brain 处理
- **action.content**：发送给 Brain 的提示词内容
- **action.channel**：结果输出的通道

## Cron 表达式

```
秒  分  时  日  月  周
 0  30   9  *   *   *    → 每天 9:30
 0   0  */2  *   *   *    → 每两小时
 0   0   8  *   *  1-5    → 工作日 8:00
```

如果不熟悉 Cron 表达式，也可以使用自然语言描述配合工具转换。

## 任务类型

### Prompt 任务

最常用的类型。给 Brain 发送一段提示词，Brain 会像处理用户消息一样完成推理，结果通过指定 Channel 发送。

### 脚本任务

执行指定的 Skill 或外部脚本，适合固定流程的自动化操作。

```json
{
  "name": "数据备份",
  "schedule": "0 0 2 * * *",
  "action": {
    "type": "skill",
    "skill": "backup",
    "params": { "target": "memory" }
  }
}
```

### 复合任务

将多个步骤串联成一个工作流，按顺序执行。

## 模型选择

定时任务可以独立指定模型。对于简单的问候类任务，使用轻量模型可以降低成本；对于复杂的分析报告，可以指定高性能模型。

```json
{
  "name": "每周分析",
  "schedule": "0 0 10 * * 1",
  "action": {
    "type": "prompt",
    "model": "anthropic/claude-sonnet-4-6",
    "content": "分析本周的工作记录，生成总结报告。"
  }
}
```

## 管理定时任务

```bash
# 查看所有定时任务
openclaw cron list

# 手动触发一次
openclaw cron run "早安问候"

# 禁用某个任务
openclaw cron disable "早安问候"
```

## 注意事项

- 定时任务依赖 Gateway 持续运行，确保已正确配置[守护进程](/zh/docs/daemon-setup)
- LLM 调用可能因网络或提供商问题偶尔失败，建议配置重试策略
- 注意 API 调用成本，高频任务建议使用性价比高的模型

## 下一步

了解[守护进程设置](/zh/docs/daemon-setup)确保定时任务可靠运行，或查看 [Telegram 集成](/zh/docs/telegram-integration) 设置任务结果的推送通道。

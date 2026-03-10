---
title: "守护进程设置"
description: "配置 OpenClaw 守护进程——通过 launchd 或 systemd 实现 Agent 的开机自启和持续运行。"
category: "部署运维"
order: 40
lang: "zh"
lastUpdated: "2026-03-10"
relatedDocs:
  - "gateway"
  - "system-architecture"
  - "cron-tasks"
keywords:
  - "守护进程"
  - "Daemon"
  - "launchd"
  - "systemd"
  - "部署"
faq:
  - q: "macOS 和 Linux 分别用什么管理守护进程？"
    a: "macOS 使用 launchd，Linux 使用 systemd。OpenClaw 提供了针对两种系统的配置模板和一键安装命令。"
  - q: "Agent 崩溃了会自动重启吗？"
    a: "会。守护进程配置中包含了自动重启策略，Gateway 异常退出后会被自动拉起，确保服务持续可用。"
  - q: "如何查看 Agent 的运行日志？"
    a: "macOS 上使用 'log show --predicate' 或查看配置中指定的日志文件路径。Linux 上使用 'journalctl -u openclaw' 查看。"
---

## 为什么需要守护进程

AI Agent 的价值在于"永远在线"。如果 Agent 需要你手动启动才能运行，那它就不是一个真正自主的 Agent。守护进程确保：

- 机器开机后 Agent 自动启动
- 进程异常退出后自动重启
- 日志自动收集和轮转
- 系统资源的合理管理

## macOS：使用 launchd

### 快速设置

OpenClaw 提供一键安装命令：

```bash
openclaw daemon install
```

这会创建并加载一个 launchd 配置文件。

### 手动配置

创建文件 `~/Library/LaunchAgents/ai.openclaw.gateway.plist`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.openclaw.gateway</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/openclaw</string>
        <string>gateway</string>
        <string>start</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/openclaw.stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/openclaw.stderr.log</string>
</dict>
</plist>
```

加载服务：

```bash
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

### 管理命令

```bash
# 查看服务状态
launchctl list | grep openclaw

# 停止服务
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist

# 重启服务
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

## Linux：使用 systemd

### 快速设置

```bash
openclaw daemon install --systemd
```

### 手动配置

创建文件 `/etc/systemd/system/openclaw.service`：

```ini
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/local/bin/openclaw gateway start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
sudo systemctl enable openclaw
sudo systemctl start openclaw
```

### 管理命令

```bash
# 查看状态
sudo systemctl status openclaw

# 查看日志
journalctl -u openclaw -f

# 重启
sudo systemctl restart openclaw
```

## 日志管理

守护进程的日志对于排查问题至关重要。建议：

- 开发阶段设置详细日志级别（debug）
- 生产环境使用普通级别（info）
- 定期检查日志文件大小，避免磁盘占满

## 健康检查

可以通过 Gateway 的健康检查端点验证服务状态：

```bash
curl http://127.0.0.1:18789/health
```

建议配合监控工具设置告警，在服务异常时及时通知。

## 下一步

守护进程设置完成后，查看[定时任务](/zh/docs/cron-tasks)配置 Agent 的自动化工作流，或回顾[系统架构](/zh/docs/system-architecture)了解完整的部署拓扑。

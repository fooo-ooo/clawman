---
title: "Daemon Setup"
description: "Run OpenClaw as a persistent background service using launchd on macOS or systemd on Linux."
category: "Deployment"
order: 40
lang: "en"
lastUpdated: "2026-03-10"
relatedDocs:
  - "installation-guide"
  - "system-architecture"
  - "cron-tasks"
keywords:
  - "OpenClaw daemon"
  - "launchd OpenClaw"
  - "systemd OpenClaw"
  - "always-on agent"
faq:
  - q: "How do I run OpenClaw as a background service?"
    a: "On macOS, use launchd with a plist file. On Linux, use systemd with a service unit file. Both ensure OpenClaw restarts automatically on failure or reboot."
  - q: "Does OpenClaw need to run 24/7?"
    a: "For always-on agents (Telegram bots, scheduled tasks, monitoring), yes. For on-demand usage, you can start and stop the gateway manually."
---

## Running OpenClaw as a Daemon

For production use, OpenClaw should run as a persistent background service that starts on boot and restarts on failure.

## macOS: launchd

Create a plist file at `~/Library/LaunchAgents/ai.openclaw.gateway.plist`:

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

Load and start the service:

```bash
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist
launchctl start ai.openclaw.gateway
```

### Managing the Service

```bash
# Check status
launchctl list | grep openclaw

# Stop
launchctl stop ai.openclaw.gateway

# Unload (disable)
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

## Linux: systemd

Create a service file at `/etc/systemd/system/openclaw.service`:

```ini
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/local/bin/openclaw start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw
```

### Managing the Service

```bash
# Check status
sudo systemctl status openclaw

# View logs
journalctl -u openclaw -f

# Restart
sudo systemctl restart openclaw
```

## Monitoring

Once running as a daemon, monitor your agent with:

```bash
# Check gateway health
curl http://127.0.0.1:18789/health

# View recent logs
openclaw logs --tail 50
```

## Next Steps

- Set up [Cron Tasks](/en/docs/cron-tasks) for scheduled agent operations
- Learn about the [System Architecture](/en/docs/system-architecture) for deeper understanding

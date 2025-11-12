# Coffic 工具箱

这是一个基于 pnpm 的单体仓库，包含网页版的工具、MCP版的工具等。

## 项目结构

```text
coffic-mcp-monorepo/
├── packages/
│   └── coffic-mcp/          # 主要的 MCP 项目
├── pnpm-workspace.yaml       # pnpm 工作区配置
├── package.json             # 根级 package.json
└── README.md                # 本文件
```

## 开发环境

查看`package.json`中的脚本了解更多。

## 部署

查看`.github`目录了解更多。

## Coffic MCP

- 在 Cursor 中使用

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=Coffic&config=eyJjb21tYW5kIjoibnB4IG1jcC1yZW1vdGUgaHR0cHM6Ly9tY3AuY29mZmljLmNuL3NzZSJ9)

- 在 Qoder 中使用

```json
"coffic-tools": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.coffic.cn/sse"
      ]
    }
```

## Coffic Tool

网站项目，包括很多实用的工具。

# CodeBrush

![CodeBrush Banner](https://github.com/954510662-bot/Vercel/assets/954510662/12345678-1234-5678-1234-567812345678)

> 专业级在线设计工具，对标 Figma，支持实时协作、插件系统和云端同步

---

## 🎯 项目简介

CodeBrush 是一款专业的在线设计工具，旨在为设计师和开发者提供强大、高效的设计体验。

### ✨ 核心特性

| 功能 | 描述 |
|------|------|
| 🎨 **Canvas 编辑器** | 强大的画布编辑功能，支持多种图层类型 |
| 📝 **文本处理** | 支持多种字体、字号、颜色编辑 |
| 🖼️ **图片处理** | 图片上传、缩放、裁剪功能 |
| 📤 **多格式导出** | 支持 PNG、SVG、JSON 格式导出 |
| ⌨️ **快捷键系统** | 可自定义的快捷键支持 |
| 🔌 **插件系统** | 支持扩展功能的插件架构 |
| ☁️ **云存储** | 项目云端同步与备份 |
| 👥 **实时协作** | 多人实时协作编辑 |

---

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **状态管理**: Zustand
- **样式框架**: Tailwind CSS 3
- **图标库**: Lucide React
- **动画库**: Framer Motion
- **路由**: React Router DOM
- **构建优化**: Terser

---

## 🚀 快速开始

### 前置要求

- Node.js ≥ 20.x
- pnpm ≥ 8.x

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/954510662-bot/Vercel.git
cd Vercel

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产版本
pnpm run preview
```

### 目录结构

```
CodeBrush/
├── src/
│   ├── components/
│   │   ├── ui/           # UI组件库
│   │   ├── Editor.tsx    # Canvas编辑器
│   │   ├── Toolbar.tsx   # 工具栏
│   │   └── ...
│   ├── store/            # Zustand状态管理
│   ├── hooks/            # 自定义Hooks
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型定义
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 入口文件
├── public/               # 静态资源
├── website/              # 官方网站
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 📖 使用指南

### 创建项目

1. 打开 CodeBrush 应用
2. 点击左上角「新建项目」按钮
3. 选择空白画布或使用模板
4. 开始添加图层和设计元素

### 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Z` | 撤销 |
| `Ctrl + Shift + Z` | 重做 |
| `Ctrl + C` | 复制 |
| `Ctrl + V` | 粘贴 |
| `Ctrl + G` | 组合图层 |
| `Delete` | 删除选中 |

---

## 📦 官方网站

官网已部署在 GitHub Pages：

🌐 **官网地址**: https://954510662-bot.github.io/Vercel/

官网包含：
- 产品介绍页面
- 功能特性展示
- 下载中心
- 文档中心
- 用户登录/注册

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: 添加xxx功能'`)
4. 推送到分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 📧 联系方式

- 📝 提交 Issue: [GitHub Issues](https://github.com/954510662-bot/Vercel/issues)
- 💬 讨论区: [GitHub Discussions](https://github.com/954510662-bot/Vercel/discussions)

---

⭐ 如果这个项目对您有帮助，请给个 Star！

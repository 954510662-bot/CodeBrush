# CodeBrush 官方网站

专业级在线设计工具的官方网站，展示产品信息、下载中心、文档中心、用户系统等核心功能。

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
cd website
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000 查看网站。

### 构建生产版本

```bash
pnpm build
```

预览生产构建：

```bash
pnpm preview
```

## 📁 项目结构

```
website/
├── src/
│   ├── components/          # React 组件
│   │   └── layout/        # 布局组件
│   │       ├── Layout.tsx  # 页面布局
│   │       ├── Header.tsx  # 导航头部
│   │       └── Footer.tsx  # 页脚
│   ├── pages/             # 页面组件
│   │   ├── HomePage.tsx   # 首页
│   │   ├── ProductPage.tsx # 产品介绍
│   │   ├── DownloadPage.tsx # 下载中心
│   │   ├── DocsPage.tsx   # 文档中心
│   │   ├── ContactPage.tsx # 联系我们
│   │   ├── LoginPage.tsx  # 用户登录
│   │   ├── RegisterPage.tsx # 用户注册
│   │   └── DashboardPage.tsx # 用户中心
│   ├── App.tsx           # 应用入口
│   ├── main.tsx          # React 入口
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── index.html           # HTML 模板
└── package.json        # 项目配置
```

## 🎨 设计系统

### 色彩系统

```css
/* 主色调 */
Primary: #2563EB (蓝色)
Secondary: #7C3AED (紫色)

/* 功能色 */
Success: #10B981 (绿色)
Warning: #F59E0B (橙色)
Error: #EF4444 (红色)
```

### 字体

- 标题字体: Plus Jakarta Sans
- 正文字体: Inter
- 代码字体: JetBrains Mono

## 📱 页面路由

| 路径 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | 产品介绍和下载引导 |
| `/product` | 产品 | 功能详情和路线图 |
| `/download` | 下载 | 版本选择和更新日志 |
| `/docs` | 文档 | 用户指南和API文档 |
| `/contact` | 联系 | 联系表单和FAQ |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 用户注册 |
| `/dashboard` | 用户中心 | 账户管理 |

## 🔧 技术栈

- **框架**: React 18 + TypeScript
- **路由**: React Router v6
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **构建**: Vite 5

## 📦 部署

### Vercel (推荐)

```bash
pnpm build
```

将 `dist` 目录部署到 Vercel。

### 其他平台

```bash
pnpm build
# 将 dist 目录部署到您的服务器
```

## 🔐 安全功能

- HTTPS 强制使用
- XSS 防护
- CSRF 防护
- 安全的密码存储
- JWT 认证
- 登录历史记录

## 🚀 性能优化

- 路由懒加载
- 图片优化
- CSS 压缩
- Gzip/Brotli 压缩
- CDN 加速支持

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- 邮箱: hello@codebrush.com
- GitHub: https://github.com/codebrush
- Twitter: https://twitter.com/codebrush

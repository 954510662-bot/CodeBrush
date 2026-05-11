# CodeBrush 官网部署指南

## 🚀 将官网部署到 GitHub Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

#### 步骤 1：创建独立仓库

```bash
# 在 GitHub 上创建新仓库: CodeBrush-website
# 然后克隆到本地
git clone https://github.com/YOUR_USERNAME/CodeBrush-website.git
cd CodeBrush-website

# 复制官网文件
cp -r /path/to/CodeBrush/website/* .

# 提交并推送
git add .
git commit -m "feat: 初始化官网"
git push origin main
```

#### 步骤 2：配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. 在 **Source** 中选择：
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `(root)`
3. 点击 **Save**

#### 步骤 3：启用 GitHub Actions

仓库已配置自动部署 workflow，当您 push 代码时，会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

部署完成后访问：`https://YOUR_USERNAME.github.io/CodeBrush-website/`

---

### 方法二：手动部署

如果您想手动控制部署：

#### 步骤 1：本地构建

```bash
cd website
npm install
npm run build
```

#### 步骤 2：创建 gh-pages 分支

```bash
git checkout -b gh-pages
git add dist -f
git commit -m "deploy: build output"
git push origin gh-pages
git checkout main
```

#### 步骤 3：配置 GitHub Pages

在仓库 Settings → Pages 中选择 `gh-pages` 分支作为源。

---

### 方法三：使用 GitHub CLI

```bash
# 安装 GitHub CLI
# Windows: winget install GitHub.cli

# 登录
gh auth login

# 创建仓库
gh repo create CodeBrush-website --public --clone

# 进入目录
cd CodeBrush-website

# 复制文件
cp -r /path/to/CodeBrush/website/* .

# 提交
git add .
git commit -m "feat: 初始化官网"
git push origin main

# 启用 GitHub Pages
gh repo edit --enable-pages

# 部署
npm run build
gh pages deploy dist --message "deploy: update site"
```

---

## 📁 项目结构

```
CodeBrush-website/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       ├── Header.tsx
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── DownloadPage.tsx
│   │   ├── DocsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── DashboardPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## ⚙️ 配置说明

### Vite 配置

`vite.config.ts` 中已配置：
- `base: '/CodeBrush-website/'` - 基础路径（根据仓库名调整）
- 构建输出到 `dist` 目录

**重要**：如果仓库名不是 `CodeBrush-website`，请修改：
```typescript
// vite.config.ts
base: '/your-repo-name/',
```

### GitHub Actions

`.github/workflows/deploy.yml` 已配置自动部署流程：
- 触发条件：push 到 main 分支
- Node 版本：20.x
- 自动构建并部署到 GitHub Pages

---

## 🌐 访问地址

部署成功后，官网访问地址为：

**GitHub Pages**: `https://YOUR_USERNAME.github.io/CodeBrush-website/`

**自定义域名**（可选）:
1. 在仓库 Settings → Pages → Custom domain 中添加您的域名
2. 配置 DNS：
   - 添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
3. 启用 HTTPS

---

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 检查代码规范
npm run lint
```

---

## 📝 注意事项

1. **仓库命名**：如果使用其他仓库名，必须更新 `vite.config.ts` 中的 `base` 配置
2. **依赖安装**：首次部署前确保 `node_modules` 已添加到 `.gitignore`
3. **构建失败**：检查 TypeScript 编译错误并修复
4. **访问延迟**：GitHub Pages 更新可能需要 1-2 分钟

---

## 🎯 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/CodeBrush-website.git
cd CodeBrush-website

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 4. 构建生产版本
npm run build

# 5. 本地预览
npm run preview
```

---

## 📞 获取帮助

- GitHub Pages 文档: https://docs.github.com/en/pages
- Vite 部署指南: https://vitejs.dev/guide/static-deploy.html
- GitHub Actions: https://docs.github.com/en/actions

# CodeBrush 部署配置指南

本文档提供 CodeBrush 项目的部署和持续集成配置指南。

---

## 📋 目录

1. [GitHub Actions CI/CD](#github-actions-cicd)
2. [Cloudflare Pages 部署](#cloudflare-pages-部署)
3. [Codecov 集成](#codecov-集成)
4. [环境变量配置](#环境变量配置)

---

## GitHub Actions CI/CD

### 工作流概览

项目使用 GitHub Actions 进行持续集成和部署，包含以下阶段：

```
quality-check (类型检查 + ESLint)
        ↓
test (单元测试 + 覆盖率)
        ↓
build (构建生产版本)
        ↓
security-scan (安全漏洞扫描)
        ↓
deploy (Cloudflare Pages 生产环境)
```

### 工作流文件位置

```
.github/workflows/main.yml
```

---

## Cloudflare Pages 部署

### 前置要求

1. 拥有 Cloudflare 账户
2. 已安装 Wrangler CLI（可选）

### 获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 **API Tokens** 页面
3. 点击 **Create Token**
4. 选择 **Edit Cloudflare Workers** 模板
5. 配置账户权限：
   - Account: `Edit`
   - Zone: `Edit`（如需自定义域名）
6. 设置令牌名称为 `Cloudflare Pages Deploy`
7. 点击 **Create Token**
8. **重要**：立即复制令牌，它只会显示一次

### 获取 Account ID

1. 登录 Cloudflare Dashboard
2. 选择目标账户
3. 在**概述**页面底部找到 **Account ID**
4. 复制并保存

### 在 GitHub Secrets 中配置

1. 打开 GitHub 仓库
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret** 添加以下 secrets：

| Secret 名称 | 说明 |
|------------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |

### 手动部署（可选）

使用 Wrangler CLI 手动部署：

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到 Cloudflare Pages
wrangler pages deploy dist --project-name=codebrush
```

### 自定义域名（可选）

1. 在 Cloudflare Dashboard 中添加域名
2. 配置 DNS 记录指向 Cloudflare Pages
3. 在 Pages 项目设置中绑定自定义域名

---

## Codecov 集成

### Codecov 简介

Codecov 是一个代码覆盖率分析平台，可以帮助追踪测试覆盖率和代码变更影响。

### 获取 Codecov Token

1. 访问 [codecov.io](https://codecov.io/)
2. 使用 GitHub 登录
3. 添加 `954510662-bot/CodeBrush` 仓库
4. 复制仓库的 **Codecov Token**

### 在 GitHub Secrets 中配置

1. 打开 GitHub 仓库
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加：

| Secret 名称 | 说明 |
|------------|------|
| `CODECOV_TOKEN` | Codecov 仓库 Token |

### Codecov 工作原理

工作流中的测试步骤会自动：

1. 运行 `pnpm test:coverage` 生成覆盖率报告
2. 将 `coverage/coverage-final.json` 上传到 Codecov
3. Codecov 分析并生成覆盖率趋势图

### 查看覆盖率报告

1. 访问 [codecov.io](https://codecov.io/)
2. 选择 CodeBrush 仓库
3. 查看覆盖率趋势和变更影响

---

## 环境变量配置

### 必需 Secrets

| Secret 名称 | 必需 | 说明 |
|------------|------|------|
| `CLOUDFLARE_API_TOKEN` | 是 | 用于部署到 Cloudflare Pages |
| `CLOUDFLARE_ACCOUNT_ID` | 是 | Cloudflare 账户标识 |
| `CODECOV_TOKEN` | 否 | 代码覆盖率上传（CI/CD 仍会运行，仅跳过上传） |

### 验证 Secrets 配置

Secrets 配置完成后，GitHub Actions 工作流应该能够：

1. ✅ 运行测试并生成覆盖率报告
2. ✅ 上传覆盖率报告到 Codecov
3. ✅ 部署到 Cloudflare Pages

### 本地测试

在本地验证 CI/CD 流程：

```bash
# 运行所有检查
pnpm run lint
pnpm test:run
pnpm test:coverage
pnpm run build
```

---

## 故障排除

### 常见问题

**Q: Cloudflare 部署失败？**
- 检查 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` 是否正确
- 确保 Token 具有 Pages 部署权限
- 检查 Cloudflare 账户状态

**Q: Codecov 上传失败？**
- `CODECOV_TOKEN` 可能无效或过期
- 可以暂时移除该步骤，测试仍会运行
- 覆盖率报告会保存在本地 `coverage/` 目录

**Q: 测试通过但覆盖率显示为 0？**
- 检查测试是否正确运行
- 确认 vitest.config.ts 中的 coverage 配置正确

---

## 参考链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Codecov 文档](https://docs.codecov.io/)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Vitest 文档](https://vitest.dev/)

---

**最后更新**: 2026-05-12

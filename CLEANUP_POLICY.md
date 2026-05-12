# CodeBrush 项目清理策略

## 📋 目录

1. [残余文件识别标准](#残余文件识别标准)
2. [清理策略](#清理策略)
3. [预防机制](#预防机制)
4. [清理执行清单](#清理执行清单)
5. [安全归档流程](#安全归档流程)

---

## 1. 残余文件识别标准

### 1.1 定义

残余文件是指在软件开发过程中产生的、不再需要但仍存在于项目中的文件或目录。

### 1.2 分类标准

| 类别 | 描述 | 示例 |
|------|------|------|
| **废弃代码** | 不再使用的源代码文件 | old_module.ts, deprecated_feature.js |
| **未使用资源** | 未被引用的静态资源 | unused_image.png, orphaned.css |
| **临时文件** | 开发过程中临时生成的文件 | temp.txt, debug.log |
| **编译产物** | 构建过程产生的输出 | dist/, build/, .next/ |
| **依赖缓存** | 包管理器生成的缓存 | node_modules/, .pnpm-store/ |
| **IDE配置** | 特定编辑器的配置文件 | .vscode/, .idea/ |
| **备份文件** | 备份或历史版本 | backup/, *.bak, *.old |

### 1.3 识别方法

#### 代码层面
- 未被导入的文件
- 未使用的变量和函数（通过 eslint --unused-imports）
- 被注释掉的代码块
- 引用不存在的文件

#### 资源层面
- 未在代码中引用的静态资源
- 重复或冗余的资源文件
- 过时的配置文件

---

## 2. 清理策略

### 2.1 清理原则

1. **安全第一**: 删除前必须验证文件是否被引用
2. **记录追踪**: 记录所有删除操作，便于回滚
3. **分阶段执行**: 分批次清理，每批清理后验证项目功能
4. **自动化优先**: 使用工具自动识别和清理

### 2.2 清理流程

```
识别 → 验证 → 备份 → 删除 → 验证 → 提交
```

### 2.3 清理优先级

| 优先级 | 类别 | 风险 | 操作 |
|--------|------|------|------|
| P0 | 编译产物 | 低 | 立即删除 |
| P1 | 临时文件 | 低 | 立即删除 |
| P2 | 依赖缓存 | 低 | 立即删除 |
| P3 | 未使用资源 | 中 | 验证后删除 |
| P4 | 废弃代码 | 高 | 审查后删除 |

---

## 3. 预防机制

### 3.1 配置层面

#### .gitignore 完善
确保以下内容已添加到 `.gitignore`：

```gitignore
# 编译产物
dist/
build/
.next/

# 依赖缓存
node_modules/
.pnpm-store/

# 临时文件
*.log
*.tmp
.DS_Store
Thumbs.db

# IDE配置
.vscode/
.idea/

# 构建工具缓存
.wrangler/
.cache/
```

### 3.2 开发流程

1. **代码审查**: 在 PR 审查时检查是否引入冗余文件
2. **自动化检测**: 配置 CI 检查未使用的导入
3. **定期清理**: 每季度进行一次全面清理
4. **文档更新**: 删除文件时同步更新相关文档

### 3.3 工具支持

| 工具 | 用途 | 命令 |
|------|------|------|
| eslint | 检测未使用的导入 | `eslint . --ext ts,tsx --report-unused-disable-directives` |
| depcheck | 检测未使用的依赖 | `npx depcheck` |
| git clean | 清理未跟踪文件 | `git clean -fd` |

---

## 4. 清理执行清单

### 4.1 当前项目状态分析

| 文件/目录 | 状态 | 处理建议 |
|-----------|------|----------|
| `dist/` | 不存在 | 已被 gitignore |
| `node_modules/` | 不存在 | 已被 gitignore |
| `.wrangler/` | 不存在 | 已被 gitignore |
| `src/components/ui/` | 使用中 | 保留 |
| `src/hooks/` | 使用中 | 保留 |
| `src/store/` | 使用中 | 保留 |
| `API.md` | 使用中 | 保留（API文档） |
| `website/DEPLOYMENT.md` | 使用中 | 保留（部署指南） |

### 4.2 已完成的清理

| 项目 | 状态 | 说明 |
|------|------|------|
| Vercel配置 | ✅ 已清理 | 删除了 vercel.json |
| 部署文档 | ✅ 已清理 | 删除了过时的部署文档 |
| 测试文件 | ✅ 已清理 | 删除了未使用的测试目录 |

---

## 5. 安全归档流程

### 5.1 归档原则

1. **保留价值**: 只归档有历史价值的文件
2. **版本化**: 使用 git tag 标记归档点
3. **文档化**: 记录归档内容和原因

### 5.2 归档步骤

```bash
# 创建归档分支
git checkout -b archive/2026-05-12

# 清理不需要归档的文件
git clean -fd

# 提交归档
git commit -m "archive: 2026年5月清理归档"

# 创建 tag
git tag archive/2026-05-12

# 推送到远程
git push origin archive/2026-05-12
git push origin tag archive/2026-05-12
```

### 5.3 回滚流程

```bash
# 查看归档
git tag -l

# 恢复归档内容
git checkout archive/2026-05-12
```

---

## 6. 定期维护计划

### 月度检查
- [ ] 运行 eslint 检测未使用导入
- [ ] 检查 gitignore 是否完整
- [ ] 清理临时文件

### 季度清理
- [ ] 运行 depcheck 检测未使用依赖
- [ ] 审查并清理废弃代码
- [ ] 归档历史版本

### 年度审查
- [ ] 全面代码审计
- [ ] 依赖版本更新
- [ ] 架构文档更新

---

## 7. 工具配置

### 安装依赖检查工具

```bash
pnpm add -D depcheck eslint-plugin-unused-imports
```

### ESLint 配置

在 `.eslintrc.json` 中添加：

```json
{
  "plugins": ["unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  }
}
```

---

**文档版本**: v1.0  
**创建日期**: 2026-05-12  
**适用项目**: CodeBrush
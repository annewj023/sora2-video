# 🎬 SORA2 Video - AI 视频批量生成工具

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

**一款现代化的 AI 视频批量生成工具，支持 OpenAI Sora 兼容 API**

[English](#english) · [功能特性](#-功能特性) · [快速开始](#-快速开始) · [使用指南](#-使用指南)

</div>

---

## ✨ 功能特性

- 🎯 **批量生成** - 一次性创建多个视频任务，支持并发生成
- 🖼️ **参考图片** - 上传参考图片，让 AI 基于图片生成视频
- ⚙️ **灵活配置** - 自定义视频时长 (10s/15s)、画面比例 (横屏/竖屏/)
- 🌍 **双语支持** - 中文/英文界面切换
- 🎨 **暗色主题** - 精美的 Google 风格暗色界面设计
- 💾 **本地存储** - 任务数据自动保存，刷新不丢失
- 📊 **进度追踪** - 实时显示各任务生成进度

## 📸 界面预览

> 应用采用现代暗色主题设计，操作简洁直观
<img width="2535" height="992" alt="PixPin_2025-12-05_10-34-33" src="https://github.com/user-attachments/assets/7cc406d4-7dfd-4983-970d-b00ca80b6e90" />

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

```bash
# 1. 克隆仓库
git clone 仓库地址

# 2. 进入目录
cd sora2-video

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可使用。

### 生产构建

```bash
npm run build
```

构建产物在 `dist/` 目录，可部署到任意静态服务器。

## 📖 使用指南

### 1. 配置 API

首次使用需要配置 API 连接：

1. 点击右上角 **设置按钮** (⚙️)
2. 输入你的 **API Key** 和 **API Endpoint**
3. 点击 **Save Changes** 保存

**本地API推荐参考：https://github.com/TheSmallHanCat/sora2api
   
> 💡 本工具兼容 OpenAI Sora API 格式的服务

### 2. 创建任务

| 操作 | 说明 |
|------|------|
| **添加任务** | 点击工具栏「添加任务」按钮 |
| **输入提示词** | 在输入框描述你想生成的视频内容 |
| **上传参考图** | 点击图片区域上传参考图片（可选） |
| **选择参数** | 设置时长、画面比例 |

### 3. 生成视频

- **单个生成**: 点击任务行末尾的「▶️」按钮
- **批量生成**: 勾选多个任务，点击工具栏「生成选中」
- **全部生成**: 点击工具栏「全部生成」

### 4. 查看结果

生成完成后，点击视频预览区域即可播放和下载视频。

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | 用户界面框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Zustand | 状态管理 |
| TailwindCSS | 样式方案 |
| Lucide React | 图标库 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

<a name="english"></a>

## English

SORA2 Video is a modern AI video batch generation tool that supports OpenAI Sora-compatible APIs.

### Features

- 🎯 Batch video generation with concurrent processing
- 🖼️ Reference image support for image-to-video generation
- ⚙️ Configurable duration and aspect ratio
- 🌍 Bilingual UI (Chinese/English)
- 🎨 Premium dark theme design

### Quick Start

```bash
git clone https://github.com/annewj023/sora2-video.git
cd sora2-video
npm install
npm run dev
```

### Configuration

1. Click the settings button (⚙️) in the top-right corner
2. Enter your API Key and API Endpoint
3. Save and start creating videos!

---

<div align="center">
Made with ❤️ by SORA2 Video Team
</div>

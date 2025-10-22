# GitHub Pages 部署指南

## 问题解决方案

### 1. 资源路径问题 ✅ 已修复
- 已将 `../assets` 和 `../music` 路径修改为 `./assets` 和 `./music`
- 已复制所有资源文件到web8目录中

### 2. GitHub Pages 部署步骤

#### 步骤1：上传代码到GitHub
1. 在GitHub上创建一个新仓库
2. 将web8文件夹中的所有文件上传到仓库的根目录
3. 确保 `index.html` 在仓库的根目录

#### 步骤2：启用GitHub Pages
1. 进入你的GitHub仓库
2. 点击 **Settings** 标签
3. 滚动到 **Pages** 部分
4. 在 **Source** 下选择：
   - **Deploy from a branch**
   - **Branch**: main (或你的主分支)
   - **Folder**: / (root)
5. 点击 **Save**

#### 步骤3：等待部署
- GitHub Pages通常需要几分钟来部署
- 部署完成后，你会看到绿色的勾号和网站URL
- 网站URL格式：`https://你的用户名.github.io/仓库名`

### 3. 常见问题排查

#### 问题1：404错误
**原因**：
- GitHub Pages未正确配置
- 文件路径错误
- index.html不在根目录

**解决方案**：
- 检查Settings → Pages配置
- 确保index.html在仓库根目录
- 检查所有资源文件路径

#### 问题2：资源加载失败
**原因**：
- 图片或音频文件路径错误
- 文件未上传到GitHub

**解决方案**：
- 检查浏览器开发者工具的Network标签
- 确保所有资源文件都已上传
- 使用相对路径 `./assets/img/` 而不是 `../assets/img/`

#### 问题3：网站显示空白
**原因**：
- JavaScript错误
- Vue CDN加载失败

**解决方案**：
- 检查浏览器控制台错误
- 确保网络连接正常
- 尝试刷新页面

### 4. 项目结构检查

确保你的GitHub仓库结构如下：
```
仓库根目录/
├── index.html          # 主文件
├── package.json
├── README.md
├── assets/
│   └── img/
│       ├── loc1.jpg
│       ├── loc2.jpg
│       ├── loc3.jpg
│       ├── loc4.jpg
│       ├── loc5.jpg
│       └── panorama.jpg
├── music/
│   ├── loc1.mp3
│   ├── loc2.mp3
│   ├── loc3.mp3
│   ├── loc4.mp3
│   ├── loc5.mp3
│   └── panorama.mp3
└── src/                # 可选，用于参考
    ├── components/
    ├── views/
    ├── stores/
    └── router/
```

### 5. 测试步骤

1. **本地测试**：在浏览器中打开 `web8/index.html` 确保功能正常
2. **上传测试**：上传到GitHub后等待部署完成
3. **在线测试**：访问GitHub Pages URL测试所有功能

### 6. 如果仍有问题

如果按照以上步骤操作后仍有问题，请检查：
- GitHub Pages是否已启用
- 仓库是否为公开仓库
- 文件是否完整上传
- 浏览器控制台是否有错误信息

## 成功部署后的URL格式
`https://你的GitHub用户名.github.io/你的仓库名`

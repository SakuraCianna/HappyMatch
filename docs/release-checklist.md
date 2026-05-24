# 发布检查清单

这个清单用于把本地可运行版本整理成更接近发布状态的版本。

## 构建前

- 确认 `git status` 干净。
- 运行 `node tools/analyze-level-difficulty.js`，确认没有关卡机制密度和目标分异常。
- 运行 `node tools/generate-level-maps.js` 后确认关卡文件和 `LevelMaps.ts` 同步。
- 检查 `README.md`、`CHANGELOG.md` 是否描述当前功能。

## 构建

- 构建主包：

```powershell
& 'E:\DevEco Studio\tools\node\node.exe' 'E:\DevEco Studio\tools\hvigor\bin\hvigorw.js' --mode module -p module=entry@default -p product=default -p requiredDeviceType=phone assembleHap --analyze=normal --parallel --incremental --daemon
```

- 构建测试包：

```powershell
& 'E:\DevEco Studio\tools\node\node.exe' 'E:\DevEco Studio\tools\hvigor\bin\hvigorw.js' --mode module -p module=entry@ohosTest -p product=default -p requiredDeviceType=phone assembleHap --analyze=normal --parallel --incremental --daemon
```

## 真机或模拟器体验

- 首页：图鉴、成就、设置、开始游戏、继续关卡。
- 选关页：五个世界入口和关卡解锁状态。
- 游戏页：交换、下坠、消除、道具、结算。
- 机制图鉴：功能果冻、关卡机制、道具说明。
- 设置页：音效、震动、柔和动画。
- 成就页：进度条和解锁状态。

## 发布前待补

- 配置正式签名文件。
- 替换最终版应用图标和启动页资源。
- 根据真实设备体验继续微调动画时长和关卡目标分。
- 如果接入联网能力，再补充隐私说明和数据同步策略。

# Project Newton 開發指南

## 架構說明
- **Framework**: Next.js 14 (App Router)
- **Content**: MDX files located in \`content/\`
- **Components**: 
  - \`src/components/mdx/\`: 用於 MDX 內的互動元件 (Quiz, Scene)
  - \`src/components/game/\`: 遊戲 UI (Inventory, HUD)

## 任務規範
- 當被要求建立新章節時，請參考 \`prompts/system-instruction.md\`。
- 修改 UI 時，請確保使用 Tailwind CSS。
- 狀態管理請使用 \`src/lib/store.ts\` (Zustand)。

#!/bin/bash

# 檢查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
  echo "❌ 工作目錄不乾淨，請先提交或 stash 您的更改。"
  exit 1
fi

# 獲取當前分支名稱
current_branch=$(git symbolic-ref --short HEAD)

# 推送當前分支到遠端
echo "🚀 正在推送分支 $current_branch 到遠端..."
git push -u origin "$current_branch"

# 使用 gh 創建 PR
echo "📝 正在創建 PR..."
gh pr create --fill

echo "✅ PR 創建完成！"

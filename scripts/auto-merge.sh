#!/bin/bash

echo "🤖 開始自動合併..."

# 查詢所有開啟的 PR
echo "📋 查詢 Pull Requests..."
gh pr list --repo kaoru0429/Fall-Physics --json number,author,title

# 獲取 bot 的 PR 編號
BOT_PRS=$(gh pr list --repo kaoru0429/Fall-Physics --json number,author --jq '.[] | select(.author.login | contains("bot")) | .number')

if [ -z "$BOT_PRS" ]; then
    echo "⚠️  沒有找到 Bot 的 PR"
    exit 0
fi

# 逐個處理
echo ""
echo "$BOT_PRS" | while read -r pr_num; do
    if [ -n "$pr_num" ]; then
        echo "🔄 處理 PR #$pr_num"
        gh pr merge "$pr_num" --repo kaoru0429/Fall-Physics --auto --squash --delete-branch
        echo "✅ PR #$pr_num 已設定自動合併"
        echo ""
    fi
done

echo "🎉 完成！"

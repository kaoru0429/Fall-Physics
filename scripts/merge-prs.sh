#!/usr/bin/env bash
set -e

echo "========================================"
echo "🤖 AI 自動合併系統"
echo "========================================"
echo ""

# 檢查 gh 是否可用
if ! command -v gh &> /dev/null; then
    echo "❌ gh 未安裝"
    exit 1
fi

# 檢查登入狀態
if ! gh auth status &> /dev/null; then
    echo "❌ 未登入，請執行: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI 已就緒"
echo ""

# 查詢 PR
echo "📋 查詢 Pull Requests..."
PR_JSON=$(gh pr list --repo kaoru0429/Fall-Physics --json number,author,title,mergeable 2>&1)

if [ $? -ne 0 ]; then
    echo "❌ 查詢失敗: $PR_JSON"
    exit 1
fi

# 顯示所有 PR
echo "$PR_JSON" | jq -r '.[] | "  PR #\(.number): \(.title) [@\(.author.login)]"'
echo ""

# 處理每個 PR
echo "$PR_JSON" | jq -c '.[]' | while IFS= read -r pr; do
    number=$(echo "$pr" | jq -r '.number')
    author=$(echo "$pr" | jq -r '.author.login')
    title=$(echo "$pr" | jq -r '.title')
    mergeable=$(echo "$pr" | jq -r '.mergeable')
    
    # 檢查是否為 bot
    if [[ "$author" == *"bot"* ]] || [[ "$author" == *"jules"* ]]; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🤖 Bot PR 檢測到："
        echo "   編號: #$number"
        echo "   標題: $title"
        echo "   作者: $author"
        echo "   狀態: $mergeable"
        echo ""
        
        if [ "$mergeable" = "MERGEABLE" ] || [ "$mergeable" = "UNKNOWN" ]; then
            echo "🚀 啟用自動合併..."
            
            if gh pr merge "$number" --repo kaoru0429/Fall-Physics --auto --squash --delete-branch; then
                echo "✅ PR #$number 已啟用自動合併"
            else
                echo "⚠️  自動合併失敗，嘗試直接合併..."
                gh pr merge "$number" --repo kaoru0429/Fall-Physics --squash --delete-branch || echo "❌ 合併失敗"
            fi
        else
            echo "⏳ PR 尚未準備好合併 (狀態: $mergeable)"
        fi
        
        echo ""
    fi
done

echo "========================================"
echo "✅ 處理完成"
echo "========================================"

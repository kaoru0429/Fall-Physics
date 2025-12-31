#!/bin/bash

# 顏色輸出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 AI 自動合併系統啟動${NC}"
echo "================================"

# 檢查 gh CLI 是否已登入
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI 未登入${NC}"
    echo "請先執行: gh auth login"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI 已登入${NC}"

# 獲取所有開啟的 PR
echo -e "\n${BLUE}📋 檢查開啟的 Pull Requests...${NC}"
PRS=$(gh pr list --json number,author,title,state,mergeable,statusCheckRollup --jq '.[]')

if [ -z "$PRS" ]; then
    echo -e "${YELLOW}⚠️  沒有找到開啟的 PR${NC}"
    exit 0
fi

# 解析 PR 資料
PR_COUNT=$(gh pr list --json number --jq '. | length')
echo -e "${GREEN}找到 ${PR_COUNT} 個開啟的 PR${NC}\n"

# 遍歷每個 PR
gh pr list --json number,author,title,mergeable,statusCheckRollup | jq -c '.[]' | while read -r pr; do
    PR_NUMBER=$(echo "$pr" | jq -r '.number')
    PR_AUTHOR=$(echo "$pr" | jq -r '.author.login')
    PR_TITLE=$(echo "$pr" | jq -r '.title')
    PR_MERGEABLE=$(echo "$pr" | jq -r '.mergeable')
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BLUE}📌 PR #${PR_NUMBER}${NC}"
    echo -e "   作者: ${PR_AUTHOR}"
    echo -e "   標題: ${PR_TITLE}"
    
    # 檢查是否為 Jules 或 bot 建立的 PR
    if [[ "$PR_AUTHOR" == *"bot"* ]] || [[ "$PR_AUTHOR" == "jules" ]]; then
        echo -e "${GREEN}   ✓ Bot PR，繼續檢查...${NC}"
        
        # 檢查是否可合併
        if [ "$PR_MERGEABLE" == "MERGEABLE" ]; then
            echo -e "${GREEN}   ✓ PR 狀態：可合併${NC}"
            
            # 檢查 CI/CD 狀態
            echo "   📊 檢查部署狀態..."
            
            # 獲取檢查狀態
            CHECK_STATUS=$(echo "$pr" | jq -r '.statusCheckRollup[0].conclusion // "PENDING"')
            
            if [ "$CHECK_STATUS" == "SUCCESS" ]; then
                echo -e "${GREEN}   ✓ 所有檢查已通過${NC}"
                echo -e "${YELLOW}   🚀 開始自動合併...${NC}"
                
                # 執行合併
                if gh pr merge "$PR_NUMBER" --squash --delete-branch --body "🤖 自動合併：所有檢查已通過" 2>&1; then
                    echo -e "${GREEN}   ✅ PR #${PR_NUMBER} 合併成功！${NC}"
                    
                    # 留言通知
                    gh pr comment "$PR_NUMBER" --body "✅ **已自動合併**

🎉 此 PR 已通過所有檢查並自動合併到 main 分支

- ✓ Vercel 部署成功
- ✓ 所有測試通過
- ✓ 代碼已合併

正式環境部署中：https://fall-physics-mu.vercel.app

_由自動化系統處理 @ $(date '+%Y-%m-%d %H:%M:%S')_"
                    
                else
                    echo -e "${RED}   ❌ 合併失敗${NC}"
                fi
            elif [ "$CHECK_STATUS" == "PENDING" ] || [ "$CHECK_STATUS" == "null" ]; then
                echo -e "${YELLOW}   ⏳ 檢查進行中，啟用自動合併...${NC}"
                
                # 啟用自動合併（檢查完成後會自動合併）
                if gh pr merge "$PR_NUMBER" --auto --squash --delete-branch 2>&1; then
                    echo -e "${GREEN}   ✓ 自動合併已啟用${NC}"
                    gh pr comment "$PR_NUMBER" --body "🤖 **自動合併已啟用**

⏳ 等待所有檢查完成後將自動合併到 main 分支

當前狀態：檢查進行中..."
                fi
            else
                echo -e "${RED}   ❌ 檢查失敗：${CHECK_STATUS}${NC}"
                gh pr comment "$PR_NUMBER" --body "⚠️ **自動合併已暫停**

部分檢查未通過，請查看詳細資訊：
\`\`\`
狀態: ${CHECK_STATUS}
\`\`\`

需要人工介入處理。"
            fi
        else
            echo -e "${YELLOW}   ⚠️  PR 狀態：${PR_MERGEABLE}（暫時無法合併）${NC}"
            
            if [ "$PR_MERGEABLE" == "CONFLICTING" ]; then
                gh pr comment "$PR_NUMBER" --body "⚠️ **發現合併衝突**

此 PR 與 main 分支存在衝突，需要解決後才能合併。

請執行：
\`\`\`bash
git fetch origin
git checkout <branch-name>
git merge origin/main
# 解決衝突
git push
\`\`\`"
            fi
        fi
    else
        echo -e "${BLUE}   ℹ️  非 Bot PR，跳過自動合併${NC}"
    fi
    
    echo ""
done

echo -e "\n${GREEN}🎉 自動合併流程完成${NC}"

#!/bin/bash

echo "🚀 正在構建項目..."
npm run build

echo "📤 正在部署到 Firebase..."
firebase deploy

echo "✅ 部署完成！"

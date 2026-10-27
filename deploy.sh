#!/usr/bin/env bash
set -e

REMOTE_HOST="najm"
REMOTE_DIR="/home/do0bie/app/"
REMOTE_SUDO_PASS="qwerTTyy_2202"
DOMAIN="https://patho.dentnet.space"

echo "=================================================="
echo "🚀 شروع دیپلوی پلتفرم TikZ Flow Studio روی ${DOMAIN}"
echo "=================================================="

# 1. Syncing files via rsync
echo "📦 همگام‌سازی فایل‌ها به سرور ${REMOTE_HOST}:${REMOTE_DIR}..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='test_*' \
  --exclude='build/' \
  --exclude='*.log' \
  --exclude='*.aux' \
  --exclude='*.synctex.gz' \
  ./ "${REMOTE_HOST}:${REMOTE_DIR}"

# 2. Restarting systemd service
echo "🔄 راه‌اندازی مجدد سرویس tikz-flow.service در سرور..."
ssh "${REMOTE_HOST}" "echo '${REMOTE_SUDO_PASS}' | sudo -S systemctl restart tikz-flow.service"

# 3. Checking service status
echo "🔍 بررسی سلامت و در دسترس بودن سرور..."
sleep 2

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${DOMAIN}/" || true)

if [ "${HTTP_CODE}" = "200" ]; then
  echo "✅ دیپلوی با موفقیت کامل انجام شد! کد وضعیت وب‌سایت: ${HTTP_CODE}"
  echo "🌐 آدرس زنده: ${DOMAIN}"
else
  echo "⚠️ هشدار: کد وضعیت وب‌سایت: ${HTTP_CODE}"
fi

echo "=================================================="

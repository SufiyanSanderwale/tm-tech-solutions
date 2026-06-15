@echo off
echo 🚀 Starting TM Tech Solutions redeploy...

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing git repository...
    git init
    git branch -M main
)

REM Add all files
echo 📝 Adding files to git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Fix deployment - %date% %time%"

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Please add your GitHub repository URL:
    echo git remote add origin https://github.com/YOUR_USERNAME/tm-tech-solutions.git
    echo Then run: git push -u origin main
) else (
    REM Push to GitHub
    echo ⬆️ Pushing to GitHub...
    git push origin main
    echo ✅ Code pushed to GitHub!
    echo 🔄 Vercel will automatically redeploy your website
)

echo 🎉 Redeploy process complete!
echo 📱 Check your Vercel dashboard for deployment status
pause


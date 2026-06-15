@echo off
echo ========================================
echo 🚀 TM Tech Solutions - Auto Deploy
echo ========================================
echo.

echo 📋 Checking prerequisites...

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Please run this script in your project folder.
    pause
    exit /b 1
)

echo ✅ Project files found

echo.
echo 📁 Initializing Git repository...
git init

echo.
echo 📝 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Deploy TM Tech Solutions - %date% %time%"

echo.
echo 🌿 Setting main branch...
git branch -M main

echo.
echo 🔗 Adding GitHub remote...
git remote add origin https://github.com/sufiyansanderwale54/tm-tech-solutions.git

echo.
echo ⬆️ Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed. This might be because:
    echo 1. Repository doesn't exist on GitHub yet
    echo 2. Wrong repository name
    echo 3. Authentication issues
    echo.
    echo 📋 Please create the repository on GitHub first:
    echo 1. Go to https://github.com
    echo 2. Click "New repository"
    echo 3. Name: tm-tech-solutions
    echo 4. Make it Public
    echo 5. Don't initialize with README
    echo 6. Click "Create repository"
    echo 7. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Code successfully pushed to GitHub!
echo.
echo 🚀 Now deploy on Vercel:
echo 1. Go to https://vercel.com/dashboard
echo 2. Click "Import Project"
echo 3. Select "tm-tech-solutions" repository
echo 4. Click "Deploy"
echo.
echo 🎉 Your website will be live in 2-3 minutes!
echo.
pause

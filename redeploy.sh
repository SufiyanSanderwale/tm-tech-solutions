#!/bin/bash

# TM Tech Solutions - Quick Redeploy Script
echo "🚀 Starting TM Tech Solutions redeploy..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fix deployment - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/tm-tech-solutions.git"
    echo "Then run: git push -u origin main"
else
    # Push to GitHub
    echo "⬆️ Pushing to GitHub..."
    git push origin main
    echo "✅ Code pushed to GitHub!"
    echo "🔄 Vercel will automatically redeploy your website"
fi

echo "🎉 Redeploy process complete!"
echo "📱 Check your Vercel dashboard for deployment status"


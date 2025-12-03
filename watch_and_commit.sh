#!/bin/bash

REPO_PATH="/Users/soumyamishra/Desktop/untitled folder/moneywise"
cd "$REPO_PATH"

echo "�� Monitoring repository for changes..."
echo "Press Ctrl+C to stop monitoring"

last_hash=""

while true; do
  sleep 2
  
  # Get current git status
  git_status=$(git status --porcelain)
  
  if [ ! -z "$git_status" ]; then
    echo ""
    echo "📝 Changes detected at $(date '+%H:%M:%S')"
    echo "$git_status"
    
    # Add all changes
    git add -A
    
    # Get the changes for commit message
    changed_files=$(git diff --cached --name-only | head -5)
    
    # Create dynamic commit message
    commit_msg="Auto-commit: Update $(echo "$changed_files" | wc -l) file(s)"
    
    # Commit changes
    git commit -m "$commit_msg" 2>/dev/null
    
    if [ $? -eq 0 ]; then
      echo "✅ Committed: $commit_msg"
      git log -1 --oneline
    fi
  fi
done

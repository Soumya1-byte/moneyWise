#!/bin/bash

# MoneyWise Auto-Commit Script
# Automatically checks for changes every minute and commits to repository

echo "🚀 MoneyWise Auto-Commit Script Started"
echo "📁 Monitoring directory: $(pwd)"
echo "⏰ Checking every minute..."
echo "Press Ctrl+C to stop"
echo ""

# Counter for commits
commit_count=0

while true; do
    # Check if there are any changes
    if [[ -n $(git status -s) ]]; then
        # Get current timestamp
        timestamp=$(date '+%Y-%m-%d %H:%M:%S')

        # Add all changes
        git add -A

        # Create commit message with timestamp
        commit_message="Auto-commit: Changes detected at $timestamp"

        # Commit changes
        git commit -m "$commit_message"

        # Push to remote
        git push origin main

        # Increment counter
        ((commit_count++))

        # Display success message
        echo "✅ [$timestamp] Commit #$commit_count: Changes committed and pushed"
        echo ""
    fi

    # Wait 60 seconds (1 minute) before next check
    sleep 60
done

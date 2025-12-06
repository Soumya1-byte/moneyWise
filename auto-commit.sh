#!/bin/bash

# MoneyWise Auto-Commit Script
# Checks for changes and commits if any are found

echo "🚀 MoneyWise Auto-Commit Script Started"
echo "📁 Checking directory: $(pwd)"

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

    # Display success message
    echo "✅ [$timestamp] Changes committed and pushed"
else
    echo "ℹ️  No changes detected"
fi

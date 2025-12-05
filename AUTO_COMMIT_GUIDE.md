# 🤖 Auto-Commit Script Guide

## What It Does

The `auto-commit.sh` script automatically:
- ✅ Monitors your project for any changes
- ✅ Checks every 2 seconds
- ✅ Commits changes with timestamp
- ✅ Pushes to GitHub automatically
- ✅ Shows commit count and status

## How to Use

### Start the Script

```bash
./auto-commit.sh
```

### Stop the Script

Press `Ctrl + C` (or `Cmd + C` on Mac)

## What You'll See

```
🚀 MoneyWise Auto-Commit Script Started
📁 Monitoring directory: /path/to/moneywise
⏰ Checking every 2 seconds...
Press Ctrl+C to stop

✅ [2024-01-15 10:30:45] Commit #1: Changes committed and pushed
✅ [2024-01-15 10:31:02] Commit #2: Changes committed and pushed
```

## When to Use

### ✅ Good Use Cases:
- During active development
- When making multiple small changes
- When you want automatic backups
- During testing and debugging
- When collaborating in real-time

### ❌ Not Recommended:
- For production code (too many commits)
- When making large refactors (commit manually with meaningful messages)
- When working on sensitive features (commit manually)

## Features

1. **Automatic Detection**: Detects any file changes
2. **Timestamp**: Each commit has exact time
3. **Counter**: Shows how many commits made
4. **Auto-Push**: Pushes to GitHub immediately
5. **Silent**: Only shows output when changes detected

## Customization

### Change Check Interval

Edit line in script:
```bash
sleep 2  # Change 2 to any number of seconds
```

### Change Commit Message Format

Edit line in script:
```bash
commit_message="Auto-commit: Changes detected at $timestamp"
# Change to your preferred format
```

### Change Branch

Edit line in script:
```bash
git push origin main  # Change 'main' to your branch name
```

## Troubleshooting

### Script Won't Run
```bash
chmod +x auto-commit.sh
```

### Permission Denied
```bash
sudo chmod +x auto-commit.sh
```

### Git Push Fails
- Check internet connection
- Verify GitHub credentials
- Ensure you have push access to repository

### Too Many Commits
- Stop the script
- Squash commits if needed:
```bash
git rebase -i HEAD~10  # Squash last 10 commits
```

## Alternative: Run in Background

### Start in Background
```bash
./auto-commit.sh &
```

### Stop Background Process
```bash
# Find process ID
ps aux | grep auto-commit.sh

# Kill process
kill [process_id]
```

## Pro Tips

1. **Use During Development Only**: Stop before final production push
2. **Review Commits**: Periodically check commit history
3. **Combine with .gitignore**: Ensure sensitive files are ignored
4. **Test First**: Run on a test branch first
5. **Monitor Output**: Keep terminal visible to see activity

## Safety Notes

⚠️ **Important**:
- Script commits EVERYTHING (all changes)
- Make sure `.env.local` is in `.gitignore`
- Don't commit sensitive data
- Review commits periodically
- Can create many commits quickly

## Manual Commit Alternative

If you prefer manual control:
```bash
git add -A
git commit -m "Your meaningful message"
git push origin main
```

## Stopping and Cleaning Up

### Stop Script
```
Ctrl + C
```

### Check Last Commits
```bash
git log --oneline -10
```

### Undo Last Auto-Commit (if needed)
```bash
git reset --soft HEAD~1
```

## Example Output

```
🚀 MoneyWise Auto-Commit Script Started
📁 Monitoring directory: /Users/soumya/moneywise
⏰ Checking every 2 seconds...
Press Ctrl+C to stop

✅ [2024-01-15 14:23:10] Commit #1: Changes committed and pushed
✅ [2024-01-15 14:23:45] Commit #2: Changes committed and pushed
✅ [2024-01-15 14:24:12] Commit #3: Changes committed and pushed

^C
Script stopped. Total commits: 3
```

## Quick Start

```bash
# Navigate to project
cd moneywise

# Start auto-commit
./auto-commit.sh

# Make changes to your files
# Script automatically commits and pushes

# Stop when done
Ctrl + C
```

---

**Happy Coding! 🚀**

The script is now monitoring your project and will automatically commit any changes every 2 seconds!

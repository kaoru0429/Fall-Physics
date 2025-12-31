#!/bin/bash
gh pr list --repo kaoru0429/Fall-Physics --json number,author --jq '.[] | select(.author.login | contains("bot")) | .number' | xargs -I {} gh pr merge {} --repo kaoru0429/Fall-Physics --auto --squash --delete-branch

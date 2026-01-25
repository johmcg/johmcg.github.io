---
layout: post
title: "Project Log: Adding CI and Lint to my Blog"
author: John McGee
date: 2026-01-25 13:00:00 -0400
categories: [DevOps, Automation, GitHub Actions, Jekyll]
---

My blog has become a place for me to share ideas and projects. To ensure the quality and consistency of my technical writing, I decided to implement an automated testing layer.

I implemented a **CI (Continuous Integration) pipeline** using **GitHub Actions** and Ubuntu-based runners to automate quality control for every post.

### The Challenge: "Linter Whack-a-Mole"

Initially, the linter flagged 50+ errors (specifically `MD013` for line length and `MD030` for list spacing).
![Blog Errors](/assets/blogtoolong.png)
I faced a classic DevOps dilemma: refactor years of existing content or tune the infrastructure to meet the project's needs.

I chose to create a custom `.markdownlint-cli2.jsonc` configuration to balance strict standards with the reality of my existing blog format:

```json
{
  "config": {
    "MD013": false,
    "MD030": false
  }
}
```

### The Result

By integrating this into my .github/workflows/ci.yml, I now have a "Green Build" environment. Every new post is automatically audited upon git push. If I make a formatting mistake, the pipeline fails and notifies me immediately—ensuring only "clean" code hits the live site.

Next, I plan to expand this pipeline to include automated deployment, truly completing the CI/CD loop.

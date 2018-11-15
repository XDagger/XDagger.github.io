---
layout: post
title: XDAG v 0.3.0 release notes
date: "2018-11-15 19:00:00"
image: /assets/images/posts/v030.png
summary: XDAG v 0.3.0 release notes
---

We are pleased to announce that XDAG v 0.3.0 is released.

- [XDAG v0.3.0 release](https://github.com/XDagger/xdag/releases/tag/0.3.0)
- [Github](https://github.com/XDagger/xdag)

**Change list:**

1. Optimization: Rewrite DNET for better performance and stability.
1. Optimization: Reuse extra blocks to reduce blocks.
1. Optimization: Changed the way that orphan blocks are managed for better performance.
1. Optimization: Add index for internal blocks to speed up storage loading and synchronization.
1. Optimization: Previous code has been optimized to improve performance.
1. Optimization: Mined blocks which did not become main blocks are removed from the network.
1. Refactor JSON-RPC to fix issues and implement required features.
1. Fix: New blocks are not generated until the pool is synchronized with the network.
1. Fix: segfault issues has been fixed to improve stability.
1. Fix: Memory leak issues has been fixed to improve stability.
1. Fix: Temporary file size issue has been fixed.
1. Fix: An issue with disconnection of miners has been fixed.
1. Fix: A payment issue has been fixed.
1. Fix: Wallet issue when using wallet in MacOS Mojave environment has been fixed.
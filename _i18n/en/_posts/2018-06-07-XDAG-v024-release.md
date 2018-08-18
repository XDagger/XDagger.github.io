---
layout: post
date: "2018-06-07 09:30:00"
image: /assets/images/posts/v024.png
title: XDAG v0.2.4 Release & Change List
---

We are pleased to announce that XDAG v0.2.4 is released.

1. [XDag v0.2.4 release](https://github.com/XDagger/xdag/releases/tag/0.2.4)
2. [Github](https://github.com/XDagger/xdag)
3. [BitcoinTalk](https://bitcointalk.org/index.php?topic=2552368.msg39533714#msg39533714)

**Change list:**
- Whitelist is automatically updated from GitHub.
- Wallet with mining turned off sends only one share per task instead of six.
- Inactive connections (connections which do not send shares at all) are automatically disconnected after 5 minutes of inactivity.
- New command *disconnect:* allows pool-owner to manually disconnect a miner.
- Main network and test network are protected against accidental merging.
- Command history and auto-completion for Mac and Linux console wallets has beed added.
- Bug with payments to miner which was disconnected long time ago is fixed.

Description of *disconnect* command: this command allows to disconnect some or all connections depending on parameters.
~~~
disconnect all - disconnects all connections
disconnect ip <IP> - disconnects all connections with specified IP
disconnect address <ADDRESS> - disconnect all connections with specified address
~~~
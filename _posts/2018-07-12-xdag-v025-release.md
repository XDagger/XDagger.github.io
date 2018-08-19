---
layout: post
date: "2018-07-12 07:30:00"
image: /assets/images/posts/v025.png
title: XDAG v0.2.5 Release
---

We are pleased to announce that XDAG v0.2.5 is released.

- [XDAG v0.2.5 release](https://github.com/XDagger/xdag/releases/tag/0.2.5)
- [Github](https://github.com/XDagger/xdag)
- [BitcoinTalk](https://bitcointalk.org/index.php?topic=2552368.msg41997908#msg41997908)

**Change list:**
1. Increased performance of loading of storage folder and synchronisation between pools (up to 100%).
1. Worker names. Now it is possible to mark your rigs with names and track them. New version of [Dagger Gpu Miner (v0.3.0)](https://github.com/jonano614/DaggerGpuMiner/releases/tag/0.3.0) supports that feature.
1. Hashrate for miners is calculated by pool.
1. It is not necessary to specify pool address to start a wallet. You can start executable file without any parameters and wallet will automatically connect to any available pool.
1. CPU-mining is removed from GUI-wallet.
1. Order of transactions returned by `block` command is changed. The newest transactions are shown first now
1. New and change pool parameters and command:
  - `mainblocks N` command - returns list of newest main blocks with some additional information
  - `minedblocks N` command - returns list of last main blocks mined by current pool
  - `lastblocks` command is marked as obsolete and will be removed in xdag v0.3.1
  - `miner <ADDRESS>` command - prints detailed information about specified miner
  - `-dm` startup option - makes it possible to disable mining at all on the current pool. Disables generating new blocks each 64 seconds and pool is not available for connections for miners. This option is necessary for block explorer.
1. Several small bug-fixes and improvements
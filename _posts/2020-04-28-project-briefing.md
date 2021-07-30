---
layout: post
date: "2020-04-28 12:00:00"
title: XDAG Project Briefing
image: "/assets/images/posts/rocks-db-1.jpg"
---

## XDAG Project Briefing
Issue 1, 2020

XDAGers, we meet again.

The sudden outbreak of the COVID-19 epidemic in 2020 hit the "pause button" for many economic activities, but the pace of XDAG's progress was not interrupted. After completing the production cuts, enthusiasts are pressing on with the Apollo program. Recent development has been around the RocksDB storage revamp, with a new version to be released after testing is complete.

## RocksDB version introduction

### Historical Issues

For historical reasons, the node needs to reload data into memory every time it reboots, rebooting the node takes at least 20+ hours (before version 0.3.1, it took about 7 days to reboot), and takes up a lot of memory, hard disk, etc. The problem is a serious constraint on the expansion of community consensus.

In response to this issue, the community has completed development work on the RocksDB version, resolving the reload issue:

1. Data will be written into RocksDB from memory;
2. Drastically reduce the memory consumption of the mining pool (about 300M).
3. The full-node wallet (mining pool) reload time is reduced to seconds.

![RocksDB]({{ "/assets/images/posts/rocks-db-1.jpg" | absolute_url  }})
### Comparison between 0.3.1 and RocksDB versions

| Version | Data storage  | Memory consumption | Reload time |
| --- | --- | --- | --- |
| 0.3.1   | Memory | 50G | 20 hours |
| RocksDB version | RocksDB | 300MB | Seconds |

## Recent works

### Development work
Completed coding of RocksDB version with heavy workload, now submitted PR (https://github.com/XDagger/xdag/pull/570); Bill and swordlet released new version of Android wallet and PC wallet, with support for transaction note function; discussed and identified new mining algorithm as RandomX.

### Testing work 
Bill built the testing framework and did a lot of testing on the RocksDB version, and kbs1 will join the testing work soon.

### Community operation
Co-working with BBX exchange to carry out four activities of XDAG; lunch on QB.COM exchange and start on board activities simultaneously.

## Follow-up works

Daniel, the founder of XDAG, has vowed to create a fair system of cryptocurrency based on DAG technology, which the community has been aiming for. The core idea of the Apollo program is to complete the implementation of the "equity" feature of XDAG, the community will follow the implementation steps of RocksDB -> modify mining algorithm -> dnet refactoring -> de-whitelist to achieve this goal.

1. RocksDB to address reloading issues

See introduction above.

2. Mining algorithms to address mining equity issues

The old versions: SHA256D mining algorithm, which has a large number of professional mining machines, has led to a concentration of hash power in the hands of few people, which is far from the "fairness" that the community seeks, the adoption of a fair algorithm is the voice of the entire XDAG community.

New version: using the Random X algorithm, featuring anti-professional mining machines, and optimized specifically for general-purpose CPUs, mining is more decentralized and fairness.

3. dnet refactoring

Adopts libuv (underlying technology of node.js) to reconstruct P2P network transmission, ensuring stable and efficient transmission

Older versions: messy dnet code, complex multi-threaded logic.

New version: libuv event loop rebuilds the core P2P network code to ensure stability and reliability while enhancing future scalability.

4. Optimize network transmission and remove whitelisting

Older versions: too many bytes transferred over the network, too long synchronization time, severe centralization.

### New version
Optimizes the data structure of the network transmission, reduces the network communication bandwidth, and plans to adopt DHT network distributed hash tables, completely removing whitelisting restrictions.

![RocksDB 2]({{ "/assets/images/posts/rocks-db-2.jpg" | absolute_url  }})

The XDAG fans are never gone, the pace of progress never stops, and XDAG is destined to continue the road to decentralization and eventually reach the "other side" of fairness...

Thank you to Bill, Swordlet, kbs1, the many contributors who have been quietly contributing, and to you who are following XDAG!

## Postscript

The year 2020 is an extraordinary one, with the new coronavirus ravaging the world, accumulating about 2 million confirmed cases as of April 15, causing great impact and loss to human society. Humans are also so small in the face of viruses. Here, we pray for the blessings for the world to quickly win this epidemic war!

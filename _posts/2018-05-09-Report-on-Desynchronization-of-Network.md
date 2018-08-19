---
layout: post
author: Xdag.io
---

Recently there have been some issues regarding the mainnet desynchronization. Last night, several pool owners reported a DDoS attack. The pools in mainland China generated a lot of traffic to the rest of the international pools. Sadly, the Great Firewall of China controls traffic to and from mainland China, and the bandwidth is heavily restricted which resulted in desynchronization issues between mainland Chinese pools and international pools. The issues with slow synchronization of blocks further increased the problems.

Temporarily, it has been negotiated with some Chinese pool owners to move their pools outside of mainland China due to firewall restrictions. Pools with mainland Chinese IP addresses have temporarily been removed from the whitelist. 

In the future, we are going to investigate and give recommendations of hardware configurations to make sure that pools run optimally. The whitelisted pools will also be audited so that the configuration does not interfere with the network. To do this, we would like all pool owners to keep in contact with the developers and the rest of the community to ensure that everything works smoothly.

In the meanwhile, the development team will start to work on optimizing the network layer to avoid desynchronization issues. 

The plan for returning to a stable network is as follows:
1. Pools which are in a non-fork status will synchronize for 24 hours.
2. If the pools are in normal operation within 24 hours, the network will slowly expand to allow more pools. 
3. If the pools are not synchronized within 24 hours, there is a need for an emergency rollback to a previous state. 

Pool owners who can be trusted by the community miners and volunteer to do this rollback are advised to contact the development team. There are already several pools that volunteer to do this.

In the case of a rollback, if you are affected by a loss of coins, please contact communitymanager@xdag.io. If you lost coins due to a trade, first contact the person you performed the trade with. If you lost coins due to an exchange trade, please contact the specific exchange. 
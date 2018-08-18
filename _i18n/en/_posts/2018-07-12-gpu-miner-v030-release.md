---
layout: post
date: "2018-07-12 08:30:00"
image: /assets/images/about-mining.jpg
title: XDAG GPU Miner v0.3.0 Release
---

Our core developer Evgeniy has released an update to his XDAG GPU Miner. It now supports worker names and comes with a Mac OS version! Full change list can be found below. 

- [XDAG GPU Miner v0.3.0 release](https://github.com/jonano614/DaggerGpuMiner/releases/tag/0.3.0)
- [Github](https://github.com/jonano614/DaggerGpuMiner)

**Change list:**
1. New option `-w <WORKER_NAME>` - allows to set names for your rigs. Compatible only with XDAG 0.2.5. Do not use this option with pools version 0.2.4 and lower. Miner will be disconnected.
1. Miner tries to restart GPUs in case of errors.
1. In case of some GPU stopped - miner will not longer constantly print the last known hashrate value.
1. You can configure `-nvidia-fix` parameter now: `-nvidia-fix N`, N can an integer from 5 to 95. Default value is 90. This parameter is intended to decrease CPU usage on computers with Nvidia GPUs. If the parameter is specified, logic of miner calculates how much time GPU spends on each range of nonces and switches current thread to the sleeping state for some part of the time. Sleeping for 90% of time could cause decresing of hashrate, so now you can configure the parameter yourself. But the less the time of sleeping - the more CPU usage.
1. New parameter `-vectors` - enables OpenCL vector operations. On some GPUs it can increase performance, on some - decrease.
1. Version for Mac OS.
1. Optional fee 1%. You can disable fee with option `-no-fee`.
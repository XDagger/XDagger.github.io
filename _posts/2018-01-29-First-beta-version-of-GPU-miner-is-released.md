---
layout: post
author: Xdag.io
---

1. Link to download [https://github.com/jonano614/DaggerGpuMiner/releases](https://github.com/jonano614/DaggerGpuMiner/releases)
1. Source codes [https://github.com/jonano614/DaggerGpuMiner](https://github.com/jonano614/DaggerGpuMiner)

GPU-miner is based on OpenCL. You need to have your account address and storage folder to use it. Most of modern video cards is applicable. Current implementation is not optimized, probably hashrate can be increased in about 80% further. My AMD Radeon R9 270x makes 240 MH/s now.
Also miner supports CPU-mining. But current implementation is slower than official wallet (v845+).
Currently only Windows is supported. Version for Linux is in development. If somebody wants to make version for Mac OS - you can write me.

How to use: unpack archive to a folder. Copy storage folder to the folder with miner. Create .bat file with necessary launch parameters. Use it.
Launch parameters:
1. GPU benchmark: DaggerGpuMiner.exe -G -M
1. GPU mining: DaggerGpuMiner.exe -G -a <WALLET_ADDRESS> -p <POOL_ADDRESS>
1. CPU mining: DaggerGpuMiner.exe -cpu -a <WALLET_ADDRESS> -p <POOL_ADDRESS> -t N     (N - is a number of threads)


Different features and optional parametes:
1. "-h" - show help
1. you can list all available devices using parameters "-list-devices -G"
1. by default GPU mining is performed only on the first OpenCL device. You can specify several devices using parameter "-opencl-devices 0 1 3". Use your device numbers instead of "0 1 3". Also use can use parameter "-d " there is count of used devices.

Also I recommend you to place "pause" command in the end of the .bat file.

If you have question, suggestion or you want to participate in develpment you can write me here in PM or on email jonano614@gmail.com.
Further closest plans:
1. get rid of storage folder
1. rewrite logging
1. static position for hash rate
1. optimization of OpenCL kernel

PS: if everything works fine you can support author: XDAG  gKNRtSL1pUaTpzMuPMznKw49ILtP6qX3

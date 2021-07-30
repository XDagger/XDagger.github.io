---
layout: post
title: XDAGJ v0.4.0 Testnet
date: "2021-04-27 00:00:00"
image: "/assets/images/posts/mmexport1619538583244.jpg"
---

Hello to all,
As some of you know, we are currently working on making the project more attractive to developers.
In order to speed up the extension of the XDAG project as much as possible.
That's why we have been promoting the development of the java version lately, and we now have a much healthier testing environment than before.
We need you to test this test network and the tools that go with it.

After finding a problem with TestNet, users can submit feedback (https://github.com/XDagger/xdagj/issues) and after confirming it as a valid bug, the bug finder will be rewarded with 1000 XDAG.


# XDAG Java Edition Testing Tutorial

Full tutorial for testing XDAG Java Edition (Linux, MAC OS, Windows).

(https://github.com/XDagger/xdagj/blob/master/docs/XDAGJ_TestNet_Access_Turial_zh.md )
Tip: Please use the test network wallet for testing and store the main network wallet separately from the test network wallet to avoid confusion.

## I. Test wallet


### 1. Download the XDAG TestNet Wallet (Windows version)
(https://github.com/swordlet/win-wallet/releases/tag/0.4.0)
After downloading and unpacking, run XDagWallet.exe, to distinguish the main network wallet users will have the words "Test Network XDAG Wallet" on the interface (test wallets do not need to modify the configuration, has been automatically set to link the test network).

### 2. Users can use the test wallet for normal operations such as transferring funds, making notes, history, checking balance, etc. If you find any problems in the process, please provide feedback in time.

### 3. Test coins can be obtained by mining (after the test wallet is linked to the mining pool, it will also obtain some XDAG).

## II. Test mining


### 1. Download the mining software and unzip the file
(https://github.com/XDagger/XdagRandomxMiner/releases/download/0.4.1/Release_win_x64_0.4.1.zip)

### 2. Set the "Locked memory page" 
as required and restart the computer, details: (https://github.com/XDagger/xdagj/blob/master/docs/Win10_Configuration_RandomX_Algorithm_Environment_zh.md)

### 3. Start the mining command
DaggerMiner.exe -cpu -T -p <mining pool address:port> -t <number of mining threads> -a <wallet address>
Example (please change the address to XDAG personal test address): DaggerMiner.exe -cpu -T -p 1.15.78.91:9992 -t 2 -a +ZPRYegKvBUNi6I+xlxz+U+IP0QzCBkg (Hint: the wallet address of the main network and the test network are not common, please fill in the test network wallet address)

## III.Test network blockchain browser

Users can check the address balance, transfer records and other related information through the test network blockchain browser (http://146.56.240.230/).

## IV. Reward
After finding a problem with TestNet, users can submit feedback (https://github.com/XDagger/xdagj/issues) and after confirming it as a valid bug, the bug finder will be rewarded with 1000 XDAG.

## V. Community Support
After more than a year of development work by community contributors, the XDAG Java public beta version has been officially released recently, which is a masterpiece of craftsmanship. In order to attract more developers, we are asking the whole community to help increase the interest in the XDAG Java codebase to raise the buzz and attract more developers!

## Method (just lift a finger).

1. Open the link to (https://github.com/XDagger/xdagj)
2. Click on the "star" button below to follow the XDAG Java code base (requires registration on github).

![github star](/assets/images/posts/mmexport1619538583244.jpg)


Thanks to the community for their support!


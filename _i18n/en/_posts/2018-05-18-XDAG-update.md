---
layout: post
title: XDAG v.0.2.2 Release & Change List
image: /assets/images/posts/v022.png
---

We are pleased to announce that XDAG v0.2.2 is released.

1. [XDag v0.2.2 release](https://github.com/XDagger/xdag/releases/tag/0.2.2)
2. [Github](https://github.com/XDagger/xdag)

**Change list:** 
- Transaction address is shown in the console version, you can track the status of your transaction in the block explorer.
- New field "State" was added to the output of the "block" command. See description below.
- A bug in DNET which could break synchronization between pools is fixed.
- A bug in block validation logic which could lead to divergence of balances between pools is fixed.
- Large changes to mining:
    - Unpaid shares are paid even if miner is disconnected.
    - Miners who use several rigs with one wallet address recieve only one total payment, not several payments corresponding to the number of connections. It should help to decrease network load.
    - Restriction on count of connections with the same address was added. This count can be configured, see description below.
    - Count of shares per task from one connection was restricted to 20, if count of shares exceeds 20 (during one minute) miner is disconnected. It was made with the purpose to protect pool againnst DDOS and cheating with shares.
    - If you use several connections with the same address you can no longer send the same shares. All shares must be unique.
    - Output of the miners command was changed. See description below.
    - Max count of connections was increased to 8192.
- Small update in the GUI wallet.
- Draft version of JSON-RPC. Not ready for exchanges at the moment.
- Some log messages are disabled during the loading process of the storage. It can help to decrease count of disk I/O operations and speed up the loading of storage folder.
- DAG takes too much space in memory. Pools use temporary files for swapping in order to decrease memory usage. A new configuration "-z" was added:
     - -z <path>  - you can set path to temp-file folder.
     - -z RAM - use RAM instead of temp-files. It can speed up loading of storage and make the pool faster, but demands large amout of free memory.

Transaction address:
After a transfer, you will see this message, "Transaction address is xxxxxxxxxxxxxx, it will take several minutes to complete the transaction.". Example:

~~~
xdag> xfer 5 EnTkFVTGB+J4oKHHTQIay3Q3Zc1a8s0u
Password:
Xfer: transferred 5.000000000 XDAG to the address EnTkFVTGB+J4oKHHTQIay3Q3Zc1a8s0u.
Transaction address is ksk5SsT5PqLhAwCUhqtBFNPB6WizsDk0, it will take several minutes to complete the transaction.
~~~
You can use that address to track your transaction, for example: https://explorer.xdag.io/block/ksk5SsT5PqLhAwCUhqtBFNPB6WizsDk0

Currently you can use field "Flags" to find out the state of the transaction (block):
0 - block is just recieved.
10 - block is in processing.
1c - block is accepted.
1F - it is main block.
18 - block is rejected. It can be caused by insufficient balance or synchronization problems.

New version has a new field "state" with the following values:
- Pending
- Accepted
- Rejected
- Main


Example:
~~~
xdag> block  gkileoNyIQ+24I82gBKXcsm1wZSKHIVd
      time: 2018-05-18 01:59:27.916
 timestamp: 16bf8253fab
     flags: 0
     state: Pending
  file pos: 200
      hash: 0c93950ebed441c95d851c8a94c1b5c972971280368fe0b60f2172837aa54882
difficulty: 00000001c7a2f05a0
   balance: gkileoNyIQ+24I82gBKXcsm1wZSKHIVd           0.000000000
-------------------------------------------------------------------------------------------
                               block as transaction: details
 direction  address                                    amount
-------------------------------------------------------------------------------------------
       fee: NjVnGThQVNPsMnMwgRPTJQWvmsBNSCTB           0.000000000
    output: CtuR8NizlQHSb09T8fV3bURYCEmQ/jcN           0.000000000
     input: CtuR8NizlQHSb09T8fV3bURYCEmQ/jcN       50000.000000000
    output: XUSGrE0EHNLZ1OMZqv7pvbBa4YRA+zKp       50000.000000000
-------------------------------------------------------------------------------------------
                                 block as address: details
 direction  transaction                                amount       time
-------------------------------------------------------------------------------------------
~~~
Existing block explorers can use this field to show the block state.

**For pool owners:** The configuration for pool was updated. A new parameter "maxconn - maximum allowed number of miners with the same address" was added. Also parameters were reordered.

~~~
-P ip:port:CFG - run the pool, bind to ip:port, CFG is miners:maxip:maxconn:fee:reward:direct:fund
                     miners - maximum allowed number of miners,
                     maxip - maximum allowed number of miners connected from single ip,
                     maxconn - maximum allowed number of miners with the same address,
                     fee - pool fee in percent,
                     reward - reward to miner who got a block in percent,
                     direct - reward to miners participated in earned block in percent,
                     fund - community fund fee in percent
~~~


Example of command line for starting pool (for test net):
~~~
xdag -t -p 213.21.5.18:3366 -P 213.21.5.18:454:1000:100:60:1:1:1:1
~~~

Output of miners command was changed. Example:
~~~
xdag> miners
List of miners:
 NN  Address for payment to            Status   IP and port            in/out bytes      nopaid shares
------------------------------------------------------------------------------------------------------
 -1. EacdO89D9vDursfUP4dsPHvHu1mnKdHP  fee      -                      -                 0.000000
  0. XUSGrE0EHNLZ1OMZqv7pvbBa4YRA+zKp  active   -                      -                 34.238053
 C1. -                                 -        127.0.0.1:50013        9568/4800         34.238053
 C2. -                                 -        127.0.0.1:50634        576/96            0.135454
  1. CtuR8NizlQHSb09T8fV3bURYCEmQ/jcN  active   -                      -                 31.848017
 C1. -                                 -        127.0.0.1:50024        10944/4640        31.848017
  2. qJ4ytVsbjyiuDP57XaLo1ia323XeHFS8  archive  -                      -                 13.180378
------------------------------------------------------------------------------------------------------
Total 2 active miners.
~~~

Now all connections with the same address are grouped. Disconnected miners are marked with "archived" state. Archive miners are removed from the list when all shares are paid. In order to see the list in the old format, you can use command "miners conn."

~~~
xdag> miners conn
List of miners:
 NN  Address for payment to            Status   IP and port            in/out bytes      nopaid shares
------------------------------------------------------------------------------------------------------
  0. XUSGrE0EHNLZ1OMZqv7pvbBa4YRA+zKp  active   127.0.0.1:50013        9600/4800         34.238053
  1. CtuR8NizlQHSb09T8fV3bURYCEmQ/jcN  active   127.0.0.1:50024        10976/4640        31.848017
  2. XUSGrE0EHNLZ1OMZqv7pvbBa4YRA+zKp  active   127.0.0.1:50634        576/96            0.135454
------------------------------------------------------------------------------------------------------
Total 3 active miners.
~~~

This list shows only active connections. The new version no longer has "archive connections".

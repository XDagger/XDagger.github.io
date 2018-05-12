---
layout: postLayout
author: 
date: "2018-05-12 10:00:00"
image: assets/images/about-mining.png
---
Due to the recent events the following recommendations and decisions have been made by the community and developer team.

Only use pools listed in the whitelist. Even though it's very restraining in its current state, using only approved pools is vital for the health of the network.
For now, every submission regarding whitelist addition will be audited. This will continue until the network is fully stable.
The following requirements have to be fulfilled in order to apply for a pool:


* No private pools
* A public frontend would be appreciated. If you don't want to add one, please provide at least:
  * Pool status must be exposed in real time (maximum interval time: one minute) by HTTP
  * Pool net conn must be exposed in real time (maximum interval time: one minute) by HTTP

* Server time zone must be set to UTC time zone
* Must use ntpdate to synchronize time
* Must use root or unlimited user (max open files limit set to more then 4096) to start pool process
* Do not try to change the hardcode of max miners
* Server configuration with 8-core CPU, 32G RAM, SSD raid0/raid10 and above
* 1Gbit/s Internet Speed and above

The contact person of a pool must be added to the Discord poolowner group.

Regarding whitelist additions, please send your requests to: [pool@xdag.io](mailto:pool@xdag.io). No other ways will be accepted for now.

In your email request, please include this list and fill out everything.

1. 1 Pool IP:
2. 2 Pool Configuration:
  * 2.1 Pool config:
  * 2.2 NTP config:
  * 2.3 Timezone config:
3. 3 Pool hardware configuration:
  * 3.1 CPU:
  * 3.2 RAM:
  * 3.3 Disk:
  * 3.4 Internet bandwidth:
4. 4 Pool frontend:
  * 4.1 Stats through HTTP:
  * 4.2 Net conn through HTTP:
  * 4.3 Pool frontend link (optional): 
5. 5 Pool Owner:





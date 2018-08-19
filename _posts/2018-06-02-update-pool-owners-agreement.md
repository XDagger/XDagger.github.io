---
layout: post
date: "2018-06-02 9:00:00"
image: /assets/images/about-mining.png
title: Update - Pool Owners' Agreement
---
**The up-to-date version of Pool Owners' Agreement can be found on our [Wiki](https://github.com/XDagger/xdag/wiki/White-List#pool-owners-agreement).**

Due to the recent events the following recommendations and decisions have been made by the community and developer team.

Only use pools listed in the whitelist. Even though it’s very restraining in its current state, using only approved pools is vital for the health of the network. For now, every submission regarding whitelist addition will be audited, <em class="underline">and only one pool will be added to whitelist per week</em>. This will continue until the network is fully stable. The following requirements have to be fulfilled in order to apply for a pool:

* No private pools
* A public frontend would be appreciated. If you don’t want to add one, please provide at least:
  * <em class="underline">Pool state must be exposed in real time (maximum interval time: one minute) by HTTP.</em>
  * Pool stats must be exposed in real time (maximum interval time: one minute) by HTTP.
  * Pool net conn must be exposed in real time (maximum interval time: one minute) by HTTP.
* Server time zone must be set to UTC time zone.
* Must use ntpdate to synchronize time.
* Must use root or unlimited user (max open files limit set to more then 4096) to start pool process.
* Do not try to change the hardcode of max miners.
* Server configuration with 8-core CPU, 32G RAM, SSD raid0/raid10 and above.
* 1Gbit/s Internet Speed and above.
* <em class="underline">Do not block other pools to synchronize.</em>
* <em class="underline">The contact person of a pool must be added to the Discord poolowner group.</em>

Regarding whitelist additions, please send your requests to: [pool@xdag.io](mailto:pool@xdag.io). No other ways will be accepted for now.
In your email request, please include this list and fill out everything.

<div class="no-list-marks" markdown="1">
1. 1 Pool IP:
1. 2 Pool Configuration:
    1. 2.1 Pool config:
    1. 2.2 NTP config:
    1. 2.3 Timezone config:
1. 3 Pool hardware configuration:
    1. 3.1 CPU:
    1. 3.2 RAM:
    1. 3.3 Disk:
    1. 3.4 Internet bandwidth:
1. 4 Pool frontend:
    1. <em class="underline">4.1 State through HTTP:</em>
    1. 4.2 Stats through HTTP:
    1. 4.3 Net conn through HTTP:
    1. 4.4 Pool frontend link (optional):
1. 5 Pool Owner: <em class="underline">(Discord username is better for communication.)</em>
</div>

<em class="underline">You will receive invitation to join Discord from [pool@xdag.io](mailto:pool@xdag.io).</em>

#### Tips:

Please use UTC time and sync time on pool server with nearest source from [http://www.pool.ntp.org/](http://www.pool.ntp.org/)
`ntpupdate -s servername`  
Please use `cat /proc/cpuinfo` to get CPU info.  
Please use `cat /proc/meminfo` to get RAM info.  
Please use `ulimit -a` to get max open file info.  
Please use `timedatectl` get to timezone info.  
Please modify /etc/security/limits.conf to set open file limit.
Example:
```
soft nofile 65536
hard nofile 65536
```

`state` is xdag command, export this information at least once per minute.
```
echo -e "state\nexit\n" | ./xdag -i > state.txt
```

`stats` is xdag command, export this information at least once per minute.
```
echo -e "stats\nexit\n" | ./xdag -i > stats.txt
```

`net conn` is xdag command, export this information at least once per minute.
```
echo -e "net conn\nexit\n" | ./xdag -i > netconn.txt
```

The public HTTP access links should be like these and updated at least once per minute:
* [http://pool.xdag.us/state.txt](http://pool.xdag.us/state.txt)
* [http://pool.xdag.us/stats.txt](http://pool.xdag.us/stats.txt)
* [http://pool.xdag.us/netconn.txt](http://pool.xdag.us/netconn.txt)

Please set your firewall or iptable correctly for other pools to connect.

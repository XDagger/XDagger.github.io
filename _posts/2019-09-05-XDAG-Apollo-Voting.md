---
layout: post
title: XDAG Community Voting
date: "2019-09-05 20:30:00"
---

# Voting Time / 投票时间 
## Introduction / 介绍 

Several of our community members proposed a program named Apollo Program on July 11, 2019. This program aimed to bring XDAG from the dirt back to the sight of the whole industry in this bear market. The vote for this program was finished on July 19, 2019, in WeChat groups, at that time, 96.4% of voters supported this program. Later, Frozen, Haitao, Emiya, Sofar, Bin Chen, Zhijian Li, X Pan, and other community members discussed the tech details for topics in Apollo Program one by one.

在2019年7月11日，几位社区成员提出名叫阿波罗计划的提案。这个提案旨在将XDAG在这熊市之中从泥泞里带回到市场的视野里。是否对该计划进行细化和执行的投票在各个微信群中于2019年7月19日结束，在那个时间点，有96.4%的投票支持进一步推进阿波罗计划。随后，Frozen、Haitao、Emiya、Sofar、Bin Chen、Zhijian Li、X Pan和其他贡献建议的社区成员一起就阿波罗计划提出的各项内容逐条进行技术细节的讨论。

Finally, after several weeks of arguing on tech details, here comes the topics for voting regarding different proposals addressed by community members. To enlarge and improve our community, new topics about community management are added in.

最终，经过在技术细节上持续四周的激烈争论，在考虑到不同方面社区成员提出的建议后形成了待投票的各项内容。同时为了扩大社区影响力和改善社区治理，关于社区治理的新议题也被添加到议题列表中。

Now, what should we do in the next step for XDAG? It depends on your opinion.

现在，XDAG在下一步该做点什么呢？这就决定于你的意见。

Voting will be on tricider.com, which is a nice platform for proposals currently. Later when we have XFS - XDAG Funding System ready, all the proposals and advice will be presented on XFS instead of tricider.com. 

投票将在tricider.com上进行，tricider.com是一个非常适合进行提建议和投票的平台。后续当我们自己的 XFS（XDAG Funding System，XDAG赞助系统）准备好后，所有的提议和建议都会在XFS上进行，进而取代tricider.com。

We have 1 topic for now to be voted, and any new topics are welcome if you have.

我们有1个议题需要进行投票，同时如果你有新的想法是非常欢迎的。

Please read these topics carefully, and vote on [https://www.tricider.com/brainstorming/2SN875RYF5B](https://www.tricider.com/brainstorming/2SN875RYF5B). If you have any question please discuss in public channels such as Discord. 
请仔细阅读各个议题，并且在[https://www.tricider.com/brainstorming/2SN875RYF5B](https://www.tricider.com/brainstorming/2SN875RYF5B)上进行投票。如果有任何疑问，请在公开场合如Discord进行讨论。

## Topic List: / 议题列表: 
### Topic 1: Reduction. / 议题 1: 减产 
Option A :   
Shorten the period of 4 years to 2 years, this will reduce about 62% of not mined XDAG. It just adjusts the period with the best balance among current holders, future miners, and community itself. This proposal needs a code change of time period only. 

方案A：  
将半衰期从4年调整为2年，这将减少未来约62%的XDAG总产出。这只需要调整半衰期来达到当前持币者、未来的矿工和社区本身运转的长期发展这三者之间的平衡。此提议只需要调整半衰期部分代码。

Option B:  
Adjust block reward from 1024 XDAG to 128 XDAG, the halving period is still 4 years. It will reduce about 87.5% of the remaining supply. This proposal needs a code change of rewarding logic. 

方案B：  
将当前的块奖励从1024 XDAG直接调整为128 XDAG，半衰期维持不变，依旧是4年。这将减少未来约87.5%的XDAG总产出。此提议需要调整块奖励逻辑和奖励发放逻辑。

## Rules / 规则 
Rule 1: Only the topics that get more than 2/3 of total + 1 yes vote will be considered as our plan in the next step. For example, if there are 99 votes for this topic, and the result is more than 2/3 * 99 + 1 yes vote = 67 yes votes, this topic will be in the plan. 

规则1：只有议题获得当前议题三分之二多一个的同意投票才会被加入下一阶段的计划中。举例：假设当前议题有99个投票，如果拥有超过2/3 * 99 + 1票同意，也就是拥有超过67票同意，那么该议题就会列入推进计划。 

Rule 2: Voting will be closed on Sep 9, 2019. 

规则2：投票将在2019年9月9日结束。 

Rule 3: No cheating. If there are signs of cheating, the vote will be invalidated until there is a secure way of collecting votes. 

规则3：**拒绝作弊**。 如果有作弊迹象，投票将无效，直到有一个安全的收集方式 。


## Topic that does not require a vote:/主题不需要投票:
### Topic 1: Using the key-value database for storage. / 议题 1: 使用键值对数据库进行数据存储 
Current storage is using a raw binary file, which produced too many fragments on disk and not able to be optimized easily. So Rocksdb will be introduced to store data instead of raw files. This proposal needs more testing in the field before applying. 

当前存储是使用了原生二进制，这将在磁盘上产生大量碎片文件，并且不利于进行性能优化。因此Rocksdb 会被引入进来用来替代原生二进制进行数据存储。此提议需要在实施前进行大量测试。 

### Topic 2: Enable RPC. / 议题 2: 开启RPC 
RPC was implemented several months before, but still not well tested nor published, it needs some time to get stabilized. RPC is the auxiliary interface for exchanges and other dev tools to interact with XDAG node instance. This proposal needs testing in the field and bug fix. 

RPC在数月之前已经完成代码开发，但是还未进行充分测试，也未进行发布。这需要一些时间来进行功能稳 定。RPC是交易所和其他工具开发时同XDAG节点实例进行交互的接口。此提议需要在实际场景中进行测试和问题修复。 

### Topic 3: Release version 0.3.2. / 议题 3: 发布v0.3.2版本 
We already wasted several months to wait for code commit from anythingtechpro, bugs fixing needs remained and new version waiting to be published. This proposal needs some tests and bug fixes. 

我们已经浪费几个月的时间来等待AnyTechPro的代码提交,当前依然还有一些问题还未被修复，也亟需发布新的版本来解决一些问题。此提议需要进行一些测试和问题修复。 

### Topic 4: Increase the donation fee to 10%. / 议题 4: 增加社区捐赠比例到10% 
Community wallet is lacking funds to reward those contributors who worth to be rewarded. This proposal needs negotiation with pool owners and code changes. 

社区钱包目前缺乏资金来对那些值得奖励的人进行奖励。此提议需要矿池主们的协商和代码修改。 

### Topic 5: Increase the rewards to contributors by 100%. / 议题 5: 增加一倍对贡献者的奖励 
Since the community does not have enough funds in the past, and the maximum rewards to contributors is 40K XDAG per month, which is quite few now, and it causes a dead loop - fewer rewards lead to fewer attractions to contributors then bring fewer contributions. This proposal only needs to adjust rewards for contributors. 

在过去社区没有足够的资金，因此给予贡献者每人每月最多4万XDAG的奖励，目前看来这个奖励微乎其微，这就陷入一个死循环——更少的奖励对于贡献者而言意味着更差劲的吸引力，然后导致更少的贡献。此提议仅需要在奖励贡献者时调整相应数量即可。

### Topic 6: Enable transaction fee. / 议题 6:开启转账手续费 
As we know XDAG was launched with 0 tx fee, but the logic is implemented from the very beginning. Now it’s time to enable tx fee to secure the safety of main net and benefits of miners. The tx fee is based on the resources needed. Currently, there is no smart contract yet, so it’s fixed as 0.1 XDAG per tx. This proposal needs a code change of rewarding logic and tx logic. 

我们都知道XDAG自主网上线以来一直是0转账手续费，但是逻辑上来讲转账手续费在一开始就已经在代码中实现。现在是时候打开转账手续费来维护主网的安全，同时为矿工们的长久利益做好准备。转账手续费是基于耗费的资源。当前还没有智能合约，因此转账手续费可以固定为每笔转账0.1 XDAG手续费。此提议需要调整奖励和转账的部分代码。 

### Topic 7: Hash algorithm modification. / 提议 7:哈希算法修改 
In the past Daniel implemented XDAG with sha256d because sha256d is simple and fast, it's explained by Daniel on his blog and in the thread on bitcointalk. But it’s not fast enough now. Full nodes are facing performance issues. In this proposal, a new hash algorithm will be introduced. The candidate hash algorithm is keccak256 (SHA3-256). This proposal needs code change of the logic of mining and the logic of choosing the main chain. 

在之前Daniel在实现XDAG时采用了sha256d算法是因为sha256d简单快速，这在Daniel的个人博客和 bitcointalk论坛的创始帖中有相关解释说明。但是现在sha256d已经不够快。全节点面临严重的性能问题。在此提议中新的哈希算法将被引入。候选算法是keccak256（SHA3-256）。此提议需要修改挖矿逻辑代码和主链选择代码。 

### Topic 8: Update wallets. / 提议 8:更新钱包 
Update wallets to use the new interface to get an active pool list. Currently, most of the coin holders are using GUI wallet, those wallets cannot change the entry point - the pools’ address easily, so we need to update all wallets to help them. This proposal needs donations for a developer account for the Apple AppStore and Google Play Store, also needs many code changes for different wallets. 

更新钱包，使用新的接口来获取当前活跃的节点列表。当前很多持币用户使用的是带界面的钱包，这些钱包不不能方便调整接入点——节点地址，因此我们需要为持币用户们更新所有这些钱包。此提议需要对所有钱包进行代码修改，并且需要Apple AppStore开发者账户和Google PlayStore开发者账户费用的捐赠。

### Topic 9: P2P transmit layer. / 议题 9:点对点传输层 
Dnet is the edging tech for crypto transmit by using Semi-AES which is developed by Daniel, and dnet is the transmit layer for XDAG, but now our current developers cannot well understand this algorithm while dnet has many bugs and low performance. To improve the transmit efficiency, p2p is one of the choices. This proposal needs to investigate of p2p network and how to adapt it with XDAG/dnet. 

Dnet是采用Daniel开发的半对称加密算法的先进加密数据传输技术，dnet是XDAG中的传输层，但是现在我们的开发者们不能完全理解这个算法，同时dnet本身拥有很多问题和性能问题。为了提升传输效率，p2p是一个可以选择的方向。此提议需要调研p2p网络技术和如何将其适配到XDAG/dnet上。 

### Topic 10: Java version. / 议题 10: Java版本 
Java version of XDAG was launched several months before to let more devs get involved in XDAG. Now it needs more time to make it happen. This proposal needs Java developers to get involved. 

Java版本的XDAG早在数月之前已经由社区里的成员启动，旨在吸引更多开发者参与XDAG项目。目前它还需要一点时间才能完成最后的测试。此提议需要一些Java开发者参与。

### Topic 11: Go version. / 议题 11: Golang版本 
Like the Java version, the Golang version also targets to attract more devs. This proposal needs Golang developers to get involved. 

如同Java版本，XDAG Golang版本也是为了更好的吸引开发者。此提议需要Golang开发者参与。 

### Topic 12: Documentation. / 议题 12:文档化 
We are lacking docs since the beginning, more docs mean less pressure to current and potential contributors. This proposal needs volunteers to work on documents. 

从一开始我们就极其缺乏文档，更丰富的文档意味着当前贡献者更小的压力。此提议需要志愿者参与文档编辑。 

### Topic 13: XFS - XDAG Funding System. / 提议 13: XFS - XDAG捐助系统 
XFS was proposed by mathsw@xdag.io on April 2019, but still, no one implements this system for XDAG even it's a useful system that can help the XDAG community to encourage contributors. Here is a simple description of XFS.   
The XDAG Funding System is a tool that automates the process of rewards. A contributor should be able to create a proposal, upload and edit a proposal.
XFS Whitepaper : [https://cutt.ly/ywnGQpI](https://cutt.ly/ywnGQpI)

XFS在2019年4月由mathsw@xdag.io提议并文档化，尽管这是一个有助于社区来鼓励贡献者们的系统，但是至今仍未有人实施该系统。这里是XFS的一个简单描述。   
XDAG捐助系统是一个自动来处理奖励的工具。贡献者能够创建提案，上传并编辑提案。XFS白皮书：[https://cutt.ly/ywnGQpI](https://cutt.ly/ywnGQpI)

### Topic 14: Setup the XDAG committee. / 议题 14: 成立XDAG委员会 
The community needs people to take charge of things and to manage the community. Sofar is working alone, he is the only guy who always response to any kind of questions or blaming. We need more contributors to work together, and we need rules to run XDAG community regularly. 

社区需要有人来为社区中的各项事情负责。目前Sofar一直一个人在努力，他是唯一一个总是在响应各种质疑和 谴责的人。我们需要更多的人一起工作，我们需要规范化运营社区的规则。 

## Next Step / 下一步 
When the whole community has a consensus on all the changes to be made on XDAG, the development works will be started ASAP.   
We are calling for more developers! Please join us! 

当整个社区就所有针对XDAG的改变达成共识后，开发的工作将尽快展开。 
我们正在招募更多开发者！期待你的加入！

[Vote here](https://www.tricider.com/brainstorming/2SN875RYF5B)

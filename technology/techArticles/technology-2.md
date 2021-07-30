---
layout: techDetail
date: '2019-10-20'
title: XDAG技术详解2-基本概念
image: /technology/images/2-1.png
---

# XDAG技术详解2-基本概念

作者：社区成员Larry

## Block（块）

xdag系统的基本数据结构，固定为512个字节。每个block代表一个transaction，图中的每个结点就是一个block。

![2-1](..\images\2-1.png)

## Transaction（交易）

与block是同义词。

## Hash

对block做两次sha256 hash（32字节），这个hash值被用作block的唯一标识（ID）。

## Truncated hash

截取前面hash值的低24字节，这个是用在后面address上面的。

**说明：**虽然hash本身可以做block的唯一标识，但是系统中大部分地方用到唯一标识的地方，实际上只用了Truncated hash，也就是hash的前24字节，并没有用全部的hash值，包括后面用来当做地址或者账户的字符串也是基于Truncated hash来做的。

## Block Address

对Truncated hash做base64，这个字符串用作block的地址串（或者账户串）。

## Difficulty of block（block难度）

基于hash值转换后的一个128位的int值。注意：全系统中，所有用二进制转int的地方都是小端法。

具体计算公式：`(power(2, 128)-1)/(little-endian-int(hash) / power(2, 160))`。

## Time of block（block时间戳）

block头字段中会写入一个创建时间戳。

xdag的最小时间单位，是`(1/1024)`秒，接近毫秒但并不是毫秒。

## Link（链接）

block A如果直接连接到block B，我们说A **link** B。

## Reference（引用）

block A，通过直接或者间接的link，最终连接到了block B，我们说，A **Reference** B。

注意**Reference**并不局限于直接link，间隔link也算，比如下图中，可以说tx11 **Reference** 了tx7，也可以说tx11 **Reference** 了tx2。

![2-2](..\images\2-2.png)

## Time frame（时间片）

xdag系统以64秒为一个时间片，每个时间片做一次挖矿奖励，从1024个XDAG开始，每四年减半。

每个时间片的奖励会给到主块（后面会讲）。

## Chain（链）

一系列按次序 **Reference** 的 block，构成了一条Chain。

![2-3](..\images\2-3.png)

这里特别要注意的是，Chain的定义用的是Reference，不是link。也就是说，一个Chain中的block之间，并不是必须连续link的，可以跳跃，比如上图。

chain1包含了`tx11 -> tx7 -> tx3 -> tx2`，是一个连续link的block组成的chain。

chain2则包含了`tx12 -> tx6 -> tx4`，注意，跳过了**tx9**，依然是一个chain，这是这个定义特殊的地方，要特别注意，因为后面的定义依赖这个定义。

## Separate chain（独立链）

一个chain中，所有的block都属于不同的Time Frame。

注意上面的chain定义，举个例子。

![2-4](..\images\2-4.png)

在这个例子中，chain1是一个独立链，是一个包含了连续link block的一个chain。但是chain2只包含了图中红色的block，是一个不连续link block的chain。

因为chain1和chain2各自中的每一个block都在不同的time frame上，所以他们都可以称作独立链。

**翻译**：这里把Separate chain翻译为**独立链**，是为了表达这种每个block都属不同时间片的特点。

## Difficulty of chain（链难度）

一个Chain中，所有block难度之和，就是这条链的难度。注意上面chain的不连续性特征，另外这个链难度的计算在不同的场景下有不同的方式，后面会专门讨论。

## Main chain（主链）

所有Separate chain中，链难度最大的那个chain就是主链。注意根据前面chain的定义，main chain可以不连续。

## Main block（主块）

主链上的block就是主块。

还是用上图举例，假如chain1是的难度最大成为主链，则图中所有蓝色结点为主块。假如chain2的链难度最大，则图中所有红色结点为主块，注意不包含chain2路过的那些白色结点。

另外注意：

1. 一旦被判定为主块，系统会把挖矿奖励的1024 XDAG累加这个主块地址账户上。
2. 因为奖励只能给一个block，所以一个时间片内只能有一个主块，通常是chain路径在每个时间片中顶点处那个，这也是为什么chain要做这样允许跳跃定义的原因。如果不这样定义，就没法协调一个chain上一个时间片内多个block的角色，如果都是主块则没法发放奖励。

## Block as transaction，block as address

Block，transaction，address三者经常混用，官方文档也把三者强调为一个。技术上说，前两者是一样的东西，address只是block hash的一个字符串形式，所谓的相同，指的是可以唯一关联，不是完全相等。

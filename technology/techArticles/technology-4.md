---
layout: techDetail
date: '2019-11-01'
title: XDAG技术详解4-块类型
image: /technology/images/4-1.png
---

# XDAG技术详解4-块类型

作者：社区成员Larry

在xdag网络协议中，block分类两种大的类型，普通块和伪块。

伪块是一种command类型的块，主要目的是用来在xdag网络各个节点间传递一些统计信息，比如a节点向b节点请求拉取某个时间范围内的block。

普通块是xdag块的核心，xdag中所有与交易相关的块都是普通块。本章重点介绍普通块，伪块只做简略的说明。同时重点介绍逻辑设计部分，协议细节不做深入说明，后面会有专门的章节描述。

## block格式

在介绍不同类型块之前，先简要看下普通块的格式，伪块的格式比较简单，这里不详细说明。

根据定义，每个block为定长512个字节，其中包含16个field，每个field也定长为32字节。其中field有以下类型：

1. header

   头字段，其中包含所有field的type信息、block时间戳、交易手续费、和传输标记。这个字段会因为不同类型的block内容填充方式略有不同，在后面介绍详细格式的时候会明确说明。

2. input

   包含输入block的地址和要输入的金额，可以有多个。

3. output

   这个类型的field被用做两种不同的方式。

   1. 转账输出目标：包含输出block的地址和要输出的金额。
   2. 单纯为了构造DAG图做的引用：比如当前时间片的主块引用前一个时间片的主块，这时候金额没什么意义，设为0。

   可以有多个。

4. input signature (half)

   用输入账户的prikey做的签名。

   half：因为这个算法的签名结果是64个字节，一个field放不下，所以会放在连续两个field中，每个field就只有一半。

   这个sign结果可能会有多个，但是数量并不等于input field的数量，而是看所有input field对应的源block到底有是由多少个key签出来的（被哪个key签名的block就是属于这个key），因为有可能不同源block属于相同的key，所以，input sign的个数小于等于input field个数。

   能用input 的 prikey做签名，意味着当前创建block的人持有了input block 的 prikey，也就意味着，input block是当前创建者自己的block。因为只有归属自己的block，才有权限转出资金，才能作为input的角色存在。但从逻辑上说，这种input的签名过程，可以归属不同人，也就是说允许多个不同人的资金做输入，只是当前的实现上没有这么做。

5. output signature (half)

   用创建当前block的人的prikey签名出来的结果。

   注意这个output的字面意思与实际的用处并不一样，与转出block无关，而是当前交易block创建者的prikey签名。

   根据定义，如果一个block的signout字段能被自己的pubkey验签通过，则这个block属于自己，因为这说明这个signout字段是用自己的prikey签名的。这个signout字段，更像是对当前block中余额的一把锁，这个后面会详细讲。

   每个block一旦创建，就会用自己的prikey做签出一个signout字段，这个signout字段只能被自己的pubkey验签通过，这个block从此归属自己。但是out field指向的block却可以不是自己的block，所以这个output signature的命名是有误导性的，容易被理解为与out field有关，其实无关。

   in/out sign的签名和验签过程比较复杂，后面会专门讲这个过程，当前只有个基本概念即可。

6. public key，偶数类型。

   block创建后，会带上sign结果相关的pubkey，以便后续接受者直接验签。

   因为这个算法的pubkey结果有奇偶两种类型，这里字段也分了两种类型。

7. public key，奇数类型。

   解释见6。

## 普通块

1. 交易块

   普通的转账交易，包含的field有：

   1. header field
   2. 多个input field
   3. 多个output field
   4. 多个pubkey field
   5. 多个input signature
   6. 一个output signature，注意目前只能有一个output signature field。

2. 主块

   根据定义，主链上的块被判定为主块，会被增加挖矿奖励金额到主块账户上，比如1024。

   在实际中，主块通常是pool创建的，是每个时间片中最后一个块，用来链接所有当前时间片中pool中的交易快和所有其他类型的块。

![4-1](..\images\4-1.png)

image-20191020194425475.png

比如图中t5块，作为主块，主要的目的就是打包当前时间片中的所有交易，通过这种方式，可以加大交易tps，允许不同节点处理不同的交易，最后用主块链接一次即可。

主块通常包含field有

1. 一个header field
2. 一个output field，指向前一个周期的主块。
3. 若干个output field，指向孤块。
4. 一个output signature。
5. 最后一个field是input signature类型，这里是个特殊情况，内容并不是sign，而是挖矿的随机值，这个在后面挖矿章节详细描述。

注意，主块中不包含input field，所以也就不包含pubkey和input sign，但是必须有output sign。

1. 链接块

   链接块的目的，是为了让图尽量收敛，方便最后主块去打包。我们还是用上图中的t5举例。

![4-2](..\images\4-2.png)

image-20191020194959993.png

t5的目的是打包交易，只有被t5链接到的交易才会变为有效（被确认）。但每个block的field是有限的，如果当前周期的交易block都要由主块直接链接的话，显然能链接的个数不可能超过16，这还没有考虑pubkey和sign字段，这样每个周期内能被确认的交易就有很少了，哪怕未来field数量可以变大，也是有上限的。这就类似比特币的包大小，陷入tps瓶颈，违背了xdag设计的初衷。链接块的目的正是来解决这个问题的。

当一个周期内交易块非常多的时候，系统会自动生成一些链接块，作为中间block，负责收敛顶部孤块的数量。

![4-3](..\images\4-3.png)

image-20191020205834321.png

如图所示，假如当前有30个交易快，显然，一个主块是没法一次链接完所有交易快的，这时候，系统生成三个链接块，提前收敛一次，各自链接10个，那么主块只需要链接三个链接块即可，根据“主块直接或间接引用的块都有效”规则，30个交易也就自然被引用了。

链接块通常包含field有

1. 一个header field
2. 若干个output field，指向孤块。
3. 一个output signature。

与主块类似，链接块也不包含input field和input sign。

1. 地址块

   在一个钱包刚创建的时候，为了给自己创建一个账户地址，需要先创建一个地址块，这个块的唯一目的就是作为账户地址存在，所以叫地址块。

   地址块不包含交易，不需要链接其他交易快，也不需要链接链接块，地址块只在创建的时候链接归属自己的其他地址块。

   地址块包含的field有

   1. 一个header field
   2. 若干个output field，指向归属自己的其他地址块。
   3. 一个output signature。

## 伪块

伪块实际上代表在结点间的command请求和响应，大小也是固定为一个block（512字节），按类型分为：

1. 批量block请求

   一个结点发现自己有部分时间片的block不存在，会向其他结点发起拉取block的请求。

2. 批量block请求的响应

   上一个请求的响应消息，注意这个响应block只包含一些统计信息，和block数量，实际的block是通过异步方式从连接上发过来的。

3. sums请求

   sums是一个时间段内所有block的摘要，方便两个结点做一致性对比。

   一个结点为了对比自己跟其他结点之间的存储是否一致，会先按照时间段请求对方的sums，对比过sums后才会决定是否要拉block。

4. sums请求的响应

   上一个消息的响应，包含响应方的sums内容。

5. 单个block请求

   想对方请求指定的block。

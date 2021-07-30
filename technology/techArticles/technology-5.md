---
layout: techDetail
date: '2019-11-27'
title: XDAG技术详解5-块格式（普通块）
image: /technology/images/5-1.png
---

# XDAG技术详解5-块格式（普通块）

作者：社区成员Larry

xdag的每个块定长512个字节，分为固定的16个field，每个field为32字节。

![5-1](..\images\5-1.png)

image-20191106203553013.png

具体到每个field的细节构成，普通块和伪块的构成方式不同。

## 普通块

1. head字段

   ![5-2](..\images\5-2.png)

   image-20191109102618330.png

   1. 第一个8字节：传输层填充的信息，在计算hash的时候会清零。

      1. type：传输层block类型，目前只有一种类型就是xdag。
      2. ttl：传播次数。
      3. length：整个block大小，xdag下固定为512。
      4. crc32：把crc32字段清零后，整个block做crc32的结果。

   2. 第二个8字节：存储每个field类型。

      64-bit被切分为16个4-bit，每个4-bit表示一个field的type，倒序。

   3. 第三个8字节：时间戳。

      64位，其中低32放秒，高32位放毫秒。

   4. 第四个8字节：手续费。

2. 其他field

   其他field根据不同块类型布局不同，下面重点说交易块和主块的布局，链接块和地址块比较简单，可以参考前一章内容。

   1. 交易块

      假设交易块包含下列field：

      1. 一个head
      2. 2个input field
      3. 1个output field
      4. 2个pubkey field（假设2个input field用的是不同的key）
      5. 2个input sign（因为有2个pubkey）
      6. 1个output sign（注意这里的sign与output field没有任何关系，这个sign是当前块持有人的。）

      下面是布局

      ![5-3](..\images\5-3.png)

      image-20191127144642443.png

   2. 主块

      假设主块包含

      1. head
      2. 1个output field 指向前一个主块
      3. 2个output field 指向孤块
      4. 1个output sign
      5. 1个last field，这个field在type中是input sign，但是跟sign没关系，只是一个特殊类型。

      布局

      ![5-4](..\images\5-4.png)

      image-20191127145409976.png

3. pubkey与input sign

   每一个input作为转入资金方，都需要用自己的key做一次签名，这个签名就是input sign，同时对应的pubkey会复制到block中。

   多个input有可能来自同一个人，那么就有可能用的是同一个key，pubkey相同，那么只需要复制一次即可。但是同一个人，也可能在不同block上用不同的秘钥，所以key不同是正常的。

   原则上，pubkey与input sign是一一对应的。

4. output sign

   当一个block创建后，input 与 output 的金额差如果大于0，意味着这个block里留下了余额，这些余额就属于创建这个block的人。为了在后面转出金额的时候做转出合法性校验，需要为这个block的余额做一个签名，这个output sign就是为了做这个。

   用创建block人当前的default key对block做一次签名，就是output sign。

5. input的来源验证

   每一个input都意味另一个block账户余额的转出，当系统收到一个block时：

   1. 首先用所有pubkey对相关的input sign做一次验签，
   2. 完成input sign验证后，只能说明input sign合法性验证通过，但这笔金额的来源block是否授权了这次金额转出，并没有得到确认。
   3. output sign的创建，就是为了转出金额的时候做校验用，所以在这里，用相同的pubkey，再去address的block上，对output sign做一次验签，如果能通过，则说明这次转出是被授权过的。为什么要这样验证？因为只有当前block的input sign和上游block的output sign是同一个私钥签名的，才能说明是同一个人授权的，如果用同样的pubkey可以对两边的sign都验证通过，则能说明是同一个私钥签名的。

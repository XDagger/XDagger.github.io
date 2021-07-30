---
layout: techDetail
date: '2019-11-28'
title: XDAG技术详解6-块格式（伪块）
image: /technology/images/6-1.png
---

# XDAG技术详解6-块格式（伪块）

作者：社区成员Larry

伪块是一些命令请求和响应，格式上相对随意，每一个都有点细节上的不同，但总体风格类似。

![6-1](..\images\6-1.png)

image-20191128140949189.png

说明：

1. 第一个8字节：仍然是传输头。
2. 第二个8字节：只使用了后面8-bit，head-type=0，sub-type是真正的命令类型，其他位置清零。
3. 第三个8字节：大多数时候放start_time，但是不同的命令可能不同。
4. 第四个8字节：大多数时候放end_time。

具体到每个不同的命令，细节又略有不同。

1. 批量block请求

   1. head（field0）

      sub-type = 0，     // `XDAG_MESSAGE_BLOCKS_REQUEST`

      start_time位置：批量时间起点。

      end_time位置：批量时间终点。

   2. field1

      第一个8字节放一个request_id，用作消息序列号。后24字节清零。

   3. 后面field

      从field2开始，直接存储统计信息的结构体和所有已知hosts地址。

2. 批量block请求响应

   1. head（field0）

      sub-type = 1，     // `XDAG_MESSAGE_BLOCKS_REPLY`

      start_time位置：填充了返回的block数量

      end_time位置：保留了与请求内容一致，但实际上无用。

   2. field1

      保持请求时的request_id不变，返回时候接收者需要用这个校验。

   3. 后面field

      与请求类似，返回block中也填充自己已知的统计信息和hosts地址。

3. sums请求

   1. head（field0）

      sub-type = 2，     // `XDAG_MESSAGE_SUMS_REQUEST`

      start_time位置：sums时间起点。

      end_time位置：sums时间终点。

   2. field1

      与批量block请求相同，放request_id。

   3. 后面field

      与批量block请求相同，放统计信息。

4. sums请求响应

   除了sub-type=3（`XDAG_MESSAGE_SUMS_REPLY`）外，其他填充模式与**批量block请求响应**一样。

5. 单个block请求

   1. head（field0）

      sub-type = 6，     // `XDAG_MESSAGE_BLOCK_REQUEST`

      start_time位置：无意义，清零。

      end_time位置：无意义，清零。

   2. field1

      放请求block的hash。

   3. 后面field

      与其他block类似，放统计信息。

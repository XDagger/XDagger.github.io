---
layout: techDetail
date: '2020-01-04'
title: XDAG技术详解8-文件存储结构
image: '/technology/images/WechatIMG1352.png'
---

# XDAG技术详解8-文件存储结构

作者：社区成员Larry

## 时间格式

因为xdag的文件存储命名使用了时间戳，需要先描述时间戳的格式。

时间戳

  xdag用的时间戳是一个64位的int值，分为两部分。

尾部低10位

  表示秒以下的单位，最小单位是1/1024秒，注意作者在这里用的是二进制运算，所以用1024去分割秒。

剩余的高54位

  UTC秒。注意，实际中用不到54位。

时间片

  xdag用64秒做为一个时间片，假设t为时间戳，则 t>>16 (先右移10位去秒，再右移4位) 为时间片序号，代码中每次取时间片都是用这种方式。

## storage目录结构

一个典型的存储目录结构：

![图片1](../images/WechatIMG1352.png)

文件命名

  除了0级目录名固定为storage外，1到3级目录和block文件的命名均与时间戳有关。

  假设一个block的时间戳16进制为：XX1-XX2-XX3-XX4-XX5-XX6-XX7-XX8，则这个block会被存储在名为storage/XX1XX2XX3/XX4/XX5/XX6.dat的文件中，因为通常XX1XX2都是0（目前秒的部分只需要32位就够了，而这里实际有54位），所以我们看到的实际文件名路径一般为storage/XX3/XX4/XX5/XX6.dat，但是注意，随着时间的推移，1级目录名出现XX1XX2XX3的形式是正确的。***\*但在目前的代码实现上，只允许出现XX3，不允许出现XX1XX2XX3，所以后续都假设只有XX3一种形式\****。

目录存储

  因为文件名的命名用的是一个字节的16进制字符表示，所以理论上，任何一个目录下的子目录或者文件个数，最多只能有256个。文件名反映了对上级时间段的256分割。

3级目录下的block文件，最多可以有256个，每个文件包含了一个时间片内所有的block存储（64秒内）。

1、2、3级目录中的目录数，也是只能最多256个。

0级目录只有固定的一个storage。

## block文件结构

一个block文件（XX6.dat），存储了一个XX6时间片（64秒）内所有收到的block，按顺序把二进制放进去，个数不限，理论上这个文件可以无限大（除了受到文件系统限制）。

格式：block1-struct-binary | block2-struct-binary | ... | blockN-struct-binary。

## sums文件

sums文件格式

  sums.dat存储了当前目录下所有block（或者目录）的数据摘要结果。

  sum文件固定为4K大小，文件被等分为256个部分，存储当前目录下256个文件（目录）各自的sum计算结果。每个等分16字节，等于struct xdag_storage_sum的大小。

  ***\*struct\**** xdag_storage_sum {
  uint64_t sum;  **// 8字节**
  uint64_t size;  **// 8字节**
};

  每个block（目录）在sum在文件中的存储索引，就是block文件名的值（转为十进制后）。

  拿9d/sums.dat文件举例，这个文件的第138等分处，存储的是9d/8a.dat文件的sum计算结果（直接存储了xdag_storage_sum结构体），因为16进制的8a等于十进制的138。

sum计算方式

  每个位置实际存储的就是xdag**storage**sum结构体的二进制内容，下面说明如何计算。

  以9d/8a.dat文件的sum计算举例，在9d/sums.dat文件的第138个位置，存储了一个下面的结构体。

  ***\*struct\**** xdag_storage_sum {
  uint64_t sum;
  uint64_t size;
};

  size：8a.dat文件中所有block的字节总和，实际上就是文件大小，之所以这样描述，是因为代码是这样写的，这是直观意图，但不排除未来这两者不再相等。

  sum：把block文件按照8字节分割，每个8字节作为一个64位int叠加到sum，原始代码：s.sum += ((uint64_t *)(buf + i))[j];。这里的目的是为了做摘要后在多结点间对比数据差异，碰撞概率上比hash大，有一定瑕疵。

1/2/3级目录sum计算

  以3级目录举例，3级目录中sums.dat文件中的存储结构与block目录的sums.dat文件存储模式一致，只不过把block的位置换成了目录的位置。

  以9d目录举例，则6c/sums.dat文件中的第157位置存储的是9d目录的sum结果，因为16进制9d等于十进制157。

  9d目录的xdag**storage**sum结构体计算方法比较简单，就是把9d/sums.dat中256个xdag**storage**sum结构体的相同字段简单求和。9d-xdag**storage**sum.size = sum(9d/sums.dat.size)，sum字段类似。

  1、2级目录的sum计算方法一样。

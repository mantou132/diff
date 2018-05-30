[![Build Status](https://travis-ci.org/mantou132/diff.svg?branch=master)](https://travis-ci.org/mantou132/diff)
[![codecov](https://codecov.io/gh/mantou132/diff/branch/master/graph/badge.svg)](https://codecov.io/gh/mantou132/diff)

## 简单的字符串diff算法
`isInclude(t1, t2)`使用嵌套循环得到`t1`和`t2`中最长的子串（忽略了其中的空行）。

`diff(t1, t2)`将原字符串相同子串以外的字符做一次递归运算。

## 使用：
`diff(t1, t2)`表示在`t1`的基础上修改了哪些内容。

返回一个数组，其中每一个元素表示删除、添加或者没有修改的一行。

## 总结
1. 编写时思路不清晰，导致结构糟糕。
2. 逻辑不够严密，导致部分情况疏漏。
---
layout: post
title: "Linux下cron定时任务"
description: "Linux下cron定时任务"
category:Linux
tags: [Linux, cron]

---

#### cron配置
|代表意义|分钟|小时|日期|月份|周 |命令|
|--------|----|----|----|----|---|----|
|数字范围|0-59|0-23|1-31|1-12|1-7|命令|

*(星号) 	代表任何时刻都接受的意思！举例来说，范例一内那个日、月、周都是 * ， 就代表著『不论何月、何日的礼拜几的 12:00 都运行后续命令』的意思！
,(逗号) 	代表分隔时段的意思。举例来说，如果要下达的工作是 3:00 与 6:00 时，就会是： 0 3,6 * * * command
-(减号) 	代表一段时间范围内，举例来说， 8 点到 12 点之间的每小时的 20 分都进行一项工作： 20 8-12 * * * command
/n(斜线) 	那个 n 代表数字，亦即是『每隔 n 单位间隔』的意思，例如每五分钟进行一次，则： */5 * * * * command

#### cygwin下安装cron
1. `apt-cyg install cron`
2. cron-config 根据说明操作
3. services.msc修改cron服务, 使用登录帐号, 因为本机测试使用本地系统帐户选项一直不成功.
4. 添加任务测试cron `crontab -e`
  `* * * * * /usr/bin/date >> ~/tmp`

#### 在crontab中执行date命令, 取到的时间时区不对

```
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

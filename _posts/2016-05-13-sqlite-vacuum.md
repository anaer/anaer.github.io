---
layout: post
title: "sqlite 压缩数据库"
description: ""
category:sqlite
tags: [sqlite]
---

* 压缩整个数据库文件

```
$sqlite3 database_name "VACUUM;"
```

* 访问数据库 进行压缩

```
sqlite> VACUUM;
```

* 压缩指定表

```
sqlite> VACUUM table_name;
```
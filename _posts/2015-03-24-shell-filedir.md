---
layout: post
title: "shell中文件目录处理"
description: "shell中文件目录处理"
category:shell
tags: [shell]
---

#### 判断文件/目录是否存在

```sh
if [ ! -x "$myPath" ]; then
  mkdir "$myPath"
fi
```

    常用参数说明：
    -x 判断$myPath是否存在并且是否具有可执行权限
    -d 判断目录是否存在
    -f 判断文件是否存在
    -n 判断变量是否有值

    详细参数说明：
    -a file exists.
    -b file exists and is a block special file.
    -c file exists and is a character special file.
    -d file exists and is a directory.
    -e file exists (just the same as -a).
    -f file exists and is a regular file.
    -g file exists and has its setgid(2) bit set.
    -G file exists and has the same group ID as this process.
    -k file exists and has its sticky bit set.
    -L file exists and is a symbolic link.
    -n string length is not zero.
    -o Named option is set on.
    -O file exists and is owned by the user ID of this process.
    -p file exists and is a first in, first out (FIFO) special file or
    named pipe.
    -r file exists and is readable by the current process.
    -s file exists and has a size greater than zero.
    -S file exists and is a socket.
    -t file descriptor number fildes is open and associated with a
    terminal device.
    -u file exists and has its setuid(2) bit set.
    -w file exists and is writable by the current process.
    -x file exists and is executable by the current process.
    -z string length is zero.

#### 获取文件名和扩展名

    basename example.tar.gz .tar.gz
    # => example

    FILE="example.tar.gz"

    echo "${FILE%%.*}"
    # => example

    echo "${FILE%.*}"
    # => example.tar

    echo "${FILE#*.}"
    # => tar.gz

    echo "${FILE##*.}"
    # => gz

    # 在bash中可以这么写
    filename=$(basename "$fullfile")
    extension="${filename##*.}"
    filename="${filename%.*}"


#### 删除空目录

find . -type d -empty -depth -exec rm -r {} ';'

---
layout: post
title: "Vim 映射配置"
description: "Vim映射配置"
category: vim
tags: [vim]
---

#### JSON格式化
vim中normal模式下, 输入`,jf`执行json格式化

```sh
" 设置映射前导符
let mapleader = ","
let g:mapleader = ","

" json格式化
nmap <leader>jf :%!python -m json.tool<cr>
```

命令参数说明:
% 表示针对全部的行范围,用!调用外部命令
python的 -m选项用于指定模块的名字, 并将对应的.py文件作为脚本运行。
json/tool.py是一个命令行工具,使用json模块来校验和格式化json数据。
json是python3内置模块,在包libpython3.3-stdlib中提供。

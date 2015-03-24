---
layout: post
title: "itext"
file: 2014-03-24-java-itext.md
update: 2015-03-24 13:12
description: "itext"
category:Java
tags: [Java, iText]

---

#### iText 表格内容 水平居中

    先调用Cell.setUseAscender(true); 
    再调用Cell.setVerticalAlignment(Cell.ALIGN_MIDDLE); 

    cell.setHorizontalAlignment(Element.ALIGN_CENTER); //水平居中 
    cell.setVerticalAlignment(Element.ALIGN_MIDDLE); //垂直居中"	



#### iText 下划线
    
    Phrase phrase = new Phrase();
    phrase.add(ChunkValue(""xxxx"", titleFont));
    phrase.add(new Chunk(""公司"", titleFont));
    phrase.add(new Chunk(""2013"", titleFont).setUnderline(0.2f, -2f));
    phrase.add(new Chunk(""年度第"", titleFont));
    phrase.add(new Chunk(""99"", valueFont));
    phrase.add(new Chunk(""期"", titleFont));
    phrase.add(new Chunk(""103"", valueFont));
    insertParagraph(phrase, ""center"");"	

#### iText 下划线

    Font f = new Font(kaitiBF,12,Font.UNDERLINE);


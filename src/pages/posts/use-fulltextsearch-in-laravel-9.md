---
layout: ../../layouts/MarkdownPostLayout.astro
title: "use fulltext search in laravel 9"
pubDate: 2022-04-17T22:54:15+08:00
description: 在laravel 9.x 版本中，model定义字段时可以新增fulltext()索引，提供字段的全文搜索功能。
---

在laravel 9.x 版本中，model定义字段时可以新增fulltext()索引，提供字段的全文搜索功能。
**ps:目前要使用该功能需要配置数据库为MySQL或PostgreSQL.**

使用如下：
1、比如说post表内有个字段为body,在migrantion内定义时，这样定义：``` $table->text('body')->fulltext(); ```,就可以对body列开启fulltext全文检索了。

2、使用时，使用```whereFullText('查询的列名称','要查询的字段') ```来查询，比如说查询post表内查body字段含有'est'的记录，可以这样``` $posts = DB::table('posts')->whereFullText('body','est')->get();```,如下所示：
![whereFullText查询](/assets/post/0417/no-fulltext-2.png)
---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Nextjs 13 使用不同样式文件"
pubDate: 2022-11-14T16:17:15+08:00
description: Nextjs 13 如何使用不同样式文件？
---

在Nextjs 13里，对不同的样式文件有不同的规定：

1、全局定义样式文件，需要在globals.css里写入，比如引入tailwindcss，全局定义背景什么的；

2、其他独立样式定义可以新建样式文件，然后在需要的页面里导入该样式文件，然后使用{ styles.some-style-prop }的方式来使用；举例说明如下：

比如说我的Home页面，需要将一处文字加大，我可以在globals.css里定义，但为了独立，我新建了一个Home.module.css文件，里面写入了以下内容：
```
/* Home.module.css */

.content{
    color: grey;
    font-size: 25px;
}
```

然后我在Home的页面里，先导入该样式文件：
```
import Home from "../sytles/Home.module.css";
```
然后在元素上这样作用：
```
<p className={ Home.content }>some bla bla bal bla bla </p>
```

当然，如果这个节点全局定义的一些样式，比如说已经有tailwind样式了，还需要一些特殊的样式，我们可以这样来使用：
```
<p className={ Home.content + '  px-6 mx-6 '} >some bla bla bal bla bla </p>
```

需要注意的是在``` { Home.content + '  px-6 mx-6 '}  ```里面，```
'  px-6 mx-6 ' ``` ` px-6 `前面需要添加空格，不然的话前面的样式定义就和`px-6`连在一起了，然后样式就不起作用了。

结束！
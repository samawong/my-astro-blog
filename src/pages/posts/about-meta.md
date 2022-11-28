---
layout: ../../layouts/MarkdownPostLayout.astro
title: "About meta in html source"
pubDate: 2022-05-20T13:23:15+08:00
description: 网站源码的头部里meta都有些什么含义？
---

在前端面试过程中，有这么一道题目，是描述一下 Twitter 网站源代码里，前十行代表什么意思。这里先重温一下前几行都有哪些：

```
<!DOCTYPE html>
<html dir="ltr" lang="zh">
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />
<link rel="preconnect" href="//abs.twimg.com" />
<link rel="dns-prefetch" href="//abs.twimg.com" />
<link rel="preconnect" href="//api.twitter.com" />
<link rel="dns-prefetch" href="//api.twitter.com" />
<link rel="preconnect" href="//pbs.twimg.com" />
<link rel="dns-prefetch" href="//pbs.twimg.com" />
<link rel="preconnect" href="//t.co" />
<link rel="dns-prefetch" href="//t.co" />
<link rel="preconnect" href="//video.twimg.com" />
<link rel="dns-prefetch" href="//video.twimg.com" />
<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/client-web/polyfills.87e4d906.js" nonce="NDE1ZGU3MGQtYTg1My00ZWFhLWE1ZjMtNmVkMDNkZDBjZDc3" />
<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/client-web/vendors~main.b550e1d6.js" nonce="NDE1ZGU3MGQtYTg1My00ZWFhLWE1ZjMtNmVkMDNkZDBjZDc3" />
<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/client-web/i18n/zh.c1adcb56.js" nonce="NDE1ZGU3MGQtYTg1My00ZWFhLWE1ZjMtNmVkMDNkZDBjZDc3" />
<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/client-web/main.293bcf66.js" nonce="NDE1ZGU3MGQtYTg1My00ZWFhLWE1ZjMtNmVkMDNkZDBjZDc3" />
<meta property="fb:app_id" content="2231777543" />
<meta property="og:site_name" content="Twitter" />
<meta name="google-site-verification" content="acYOOcR5z6puMzLn6hLDZI1nNHXPxt57OIstz1vnCV0" />
<meta name="facebook-domain-verification" content="x6sdcc8b5ju3bh8nbm59eswogvg6t1" />
<meta http-equiv="onion-location" content="https://twitter3e4tixl4xyajtrzo62zg5vztmjuricljdp2c5kshju4avyoid.onion/" />
<link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
<link rel="alternate" hreflang="x-default" href="https://twitter.com/" />
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Twitter">
<link rel="mask-icon" sizes="any" href="https://abs.twimg.com/responsive-web/client-web/icon-svg.168b89d6.svg" color="#1D9BF0">
<link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico">
<link rel="apple-touch-icon" sizes="192x192" href="https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7276.png" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Twitter" />
<meta name="apple-mobile-web-app-status-bar-style" content="white" />
<meta name="theme-color" content="#ffffff" />
<meta http-equiv="origin-trial" content="AlpCmb40F5ZjDi9ZYe+wnr/V8MF+XmY41K4qUhoq+2mbepJTNd3q4CRqlACfnythEPZqcjryfAS1+ExS0FFRcA8AAABmeyJvcmlnaW4iOiJodHRwczovL3R3aXR0ZXIuY29tOjQ0MyIsImZlYXR1cmUiOiJMYXVuY2ggSGFuZGxlciIsImV4cGlyeSI6MTY1NTI1MTE5OSwiaXNTdWJkb21haW4iOnRydWV9" />
...

```

我们一行行解释：

` <!DOCTYPE html> ` 定义文档类型为 html格式；
`<html dir="ltr" lang="zh"> ` 根元素，包含整个页面的内容，`dir="ltr"` 表示元素的文本方向性，这里是从左到右（left to right）明确的方向隔离，`lang`定义了页面的默认语言（zh）;
` <meta charset="utf-8" />  ` 页面文档使用 UTF-8 字符编码;
` <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" /> ` 为viewport(视口)初始大小提供指示(hint)，目前用于移动设备。` content `内为属性值， ` width `定义 viewport 的宽度（或使用正整数（单位像素）），` initial-scale `介于`0.0`和`10.0`之间的正数，定义设备宽度，这里1就是缩放比例不动，原始大小，` maximum-scale `介于`0.0`和`10.0`之间的正数，定义缩放最大值，1表示原始大小，` user-scalabe `表示用户是否可以缩放当前页面，[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)上的值为`yes`或`no`，这里用0来表示，应该是`no`的意思，`viewport-fit`表示显示的填充方式（`auto`、`contain` 和 `cover`）；
`<link rel="preconnect" href="//abs.twimg.com" />` 提示建议浏览器提前打开与链接网站的连接；
`<link rel="dns-prefetch" href="//abs.twimg.com" />`提示浏览器该资源需要在用户点击链接之前进行 DNS 查询和协议握手；
`<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/client-web/polyfills.87e4d906.js" nonce="NDE1ZGU3MGQtYTg1My00ZWFhLWE1ZjMtNmVkMDNkZDBjZDc3" />`表示浏览器应该预加载该资源，`as`属性表示获取特定的内容类(`script`),`crossorigin`属性表示该资源是否应该使用一个CORS请求来获取;
`<meta property="fb:app_id" content="2231777543" />` 这应该定义是 Facebook 应用ID的；
`<meta property="og:site_name" content="Twitter" />` 在 Open Graph protocol 中，网站名称为Twitter，`property`值中带`og`开头的都是 Open Graph protocol协议；
`<meta http-equiv="onion-location" content="https://twitter3e4tixl4xyajtrzo62zg5vztmjuricljdp2c5kshju4avyoid.onion/" />` 这是洋葱网站的地址，就是那个是洋葱头的网站；
`<link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />` 表示链接到的文件是 Web App Manifest；
后面的一些都是特殊定义，像`apple-mobile-web-app-title`的值`Twitter`,字面意思也能猜出什么。


然后，[flutter](https://flutter.dev)团队复刻了Windows上经典的[弹珠游戏](https://pinball.flutter.dev)，我们可以看一下flutter生成的web页面前几行有什么意思：

```
...
<head>
  <!--
    If you are serving your web app in a path other than the root, change the
    href value below to reflect the base path you are serving from.

    The path provided below has to start and end with a slash "/" in order for
    it to work correctly.

    For more details:
    * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base

    This is a placeholder for base href that will be replaced by the value of
    the `--base-href` argument provided to `flutter build`.
  -->
  <base href="/">

  <meta charset="UTF-8">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta name="description"
    content="Come play Pinball with your favorite Google Developer Mascots! Built with Flutter & Firebase for Google I/O 2022.">
  <meta property="og:description"
    content="Come play Pinball with your favorite Google Developer Mascots! Built with Flutter & Firebase for Google I/O 2022.">

  <!-- Open Graph Data -->
  <meta property="og:title" content="Google I/O Pinball">
  <meta property="og:url" content="https://pinball.flutter.dev">
  <meta property="og:image"
  content="https://firebasestorage.googleapis.com/v0/b/io-pinball.appspot.com/o/images%2Fpinball_share_image.png?alt=media">

  <!-- Twitter Share Data -->
  <meta name="twitter:image"
    content="https://firebasestorage.googleapis.com/v0/b/io-pinball.appspot.com/o/images%2Fpinball_share_image.png?alt=media">
  <meta name="twitter:text:title" content="I/O Pinball Machine - Flutter">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="I/O Pinball Machine - Flutter">
  <meta name="twitter:description"
    content="Come play Pinball with your favorite Google Developer Mascots! Built with Flutter & Firebase for Google I/O 2022.">

  <!-- iOS meta tags & icons -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="I/O Pinball Machine - Flutter">
  <link rel="apple-touch-icon" href="icons/Icon-192.png">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png" />

...

```

在`<header>`里，首先是个`<base href="/">`，这个我是第一次看见，第一次知道这个，文档根 URL 元素，指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <base> 元素。
后面的`http-equiv`、`description`、`og:description`、`og：title`、`og:url`、`og:image`什么的比较常见，之后是一块Twitter Share Data,

```
<!-- Twitter Share Data -->
  <meta name="twitter:image"
    content="https://firebasestorage.googleapis.com/v0/b/io-pinball.appspot.com/o/images%2Fpinball_share_image.png?alt=media">
  <meta name="twitter:text:title" content="I/O Pinball Machine - Flutter">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="I/O Pinball Machine - Flutter">
  <meta name="twitter:description"
    content="Come play Pinball with your favorite Google Developer Mascots! Built with Flutter & Firebase for Google I/O 2022.">

```

看几个`name`名称，应该是定义了一个twitter 的分享card，card的相关值什么的，我在游戏结束后，点击Twitter分享后，在Twitter出现了一条这样的推文：

![pinball](/assets/post/0520/pinball.png)

可以看出图片上的内容，跟这款定义的属性基本相似，咱也不知道是巧合还是。。？
然后把pinball的repo clone下来，运行了一下，啥都没有，也不知道哪出错了？
唉，学海无涯啊。。。
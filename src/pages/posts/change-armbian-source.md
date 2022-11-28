---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Change Armbian Source"
pubDate: 2020-09-24T16:23:15+08:00
description: 更换Armbian的官方源，使用国内中科大源，提高apt下载更新速度
---

N1安装Armbian系统后，使用的是国外官方源，速度不友好，于是替换为国内镜像源，来提高下载更新速度显得尤为重要。
使用``` lsb_release -a```命令可以查看系统版本情况，比如我的N1系统如下所示：
```
root@aml:~# lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 18.04.5 LTS
Release:	18.04
Codename:	bionic
```
然后，备份系统自带源文件，命令``` sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak```;
接着将如下中科大的源，替换`/etc/apt/sources.list`内的内容，
```
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-backports main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-proposed main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security main multiverse restricted universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-backports main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-proposed main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security main multiverse restricted universe
deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates main multiverse
```
替换完成后，使用命令` sudo apt update && sudo apt upgrade`命令更新系统文件即可。
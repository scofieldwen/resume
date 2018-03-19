***

- 移动优先的响应式页面，采用Bootstrap3
- HTML5语义化标签，CSS3效果并增添无障碍浏览相关技术
- 个性化技能栏图标动态显示效果

***

## 1. 开始 

#### 1.1 安装

首先可以使用`git clone`命令拉取项目，或者可以直接[下载ZIP压缩文件](https://github.com/scofieldwen/resume/archive/master.zip)。

之后在项目根目录运行如下命令来安装相关npm包:

- `npm install`

>**注意:** 由于此项目制作时采用`Gulp4.0`版本，只采用项目内安装不能正常运行任务，需要全局安装，具体安装方法见[官网](https://gulpjs.com/)

>**热情提示:** 从此处开始文档介绍为基础介绍，也是个人对项目的一个记录，为节约时间可以绕行；同时希望技术大牛给予点播，感兴趣者一起探讨。“三人行必有吾师”

#### 1.2 基本使用

可因个人需求进行文件替换，如下文件夹树状图所列出的文件即为可替换文件。

>**提示:** 替换后请保持文件名字一致，如有需求可在源文件自行更改。

```txt
+---asset
    +---css
    +---fonts
    +---images
    |       1_bg.jpg         *网页上部背景图案
    |       link-qr.png      *二维码图案
    |       me.jpg           *头像图案
    |
    +---js
    \---pdf
            resume_1.compressed.pdf  *.pdf简历存放位置
```

## 2. 调试与开发

#### 2.1 运行相应任务

本项目使用Gulp结合[browser-sync](https://browsersync.io/)搭建本地服务器，达到检测文件改动提供页面实时刷新来提高调试效率。最重要的是可以在移动设备上达到同样的功能，想对移动设备调试深入的同学可以跳转到此[大神博客](http://yujiangshui.com/multidevice-frontend-debug/)。

_开始_

在能运行相关Gulp任务的机器上，定位到项目根目录打开命令行工具运行以下命令：

`gulp serve`

成功运行后出现如下提示，并自动在默认浏览器上打开当前项目页，同一局域网移动端可以登录`http://192.168.1.103:3000`来进入网页

```txt
[00:28:37] Using gulpfile ~\Documents\work\resume\gulpfile.js
[00:28:37] Starting 'serve'...
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.103:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.103:3001
 --------------------------------------
[Browsersync] Serving files from: ./
```

>**提示：** 因个人所设置的电脑IP地址不同，相应地址会有不同，请自行对照如实填写

#### 2.2 总体流程

此项目从构思到发布基本可以概括为以下流程

```txt
设计-->调试与改进-->适配机型测试-->兼容性测试-->Git提交-->Git推送
                 ^             v           v                              
                 ^             v           v      
                 |---<--<--<---v--<--<--<--v 
```
>因个人而异，可以根据习惯调整

## 3. 附录

#### 3.1 浏览器支持

所测试浏览器为IE8\9\10\11，Microsoft Edge，Chrome65.0.3325、Firefox59.0.1;相关真机测试为ipad mini4, 荣耀畅玩6。

#### 3.2 已知问题

在桌面浏览器，页面头部磨砂玻璃效果有时会在向下滚动页面后变轻。

#### 3.3 附收集网址

以下为本项目采用插件的官网，方便想深入了解的同学。

- [Bootstrap](http://getbootstrap.com/) 流行的响应式框架
- [Browser-sync](https://browsersync.io/) 实时刷新预览 (ps.搜索引擎有中文网,但官网更新较快)
- [Devicons](http://vorillaz.github.io/devicons/) 技能栏所用图标都来自这里
- [Gulp](https://gulpjs.com/) 自动化构建工具
- [jQuery](http://jquery.com/) 不用说都知道了
- [jQuery.localscroll](http://demos.flesler.com/jquery/localScroll/) 一个平滑导引效果，此为下一个插件的快速构建版本，依赖下一个插件(ps.登陆官网需科学上网)
- [jQuery.scrollto](http://demos.flesler.com/jquery/scrollTo/) 可调功能相对较全，和上一个插件同为一个开发者
- [ScrollReveal](https://scrollrevealjs.org/) 提供渐进动画效果，功能较全。
- [Chart.js](http://www.chartjs.org/) 此插件本项目中未含有,为图表生成插件(ps.因项目需要后续改进取消了，插件本身时很好的，但不太适合此项目。)

 >了解顺序不分先后，此列表顺序为本项目采用顺序

 ## 4. 特别感谢

“特别鸣谢”的话说的太大了，也是为了记录自学路程的种种不易，说一些酸酸的话；感谢[MDN](https://developer.mozilla.org/zh-CN/)平台，里面的教程文档真的好，每次查询和阅读收获的都不一样。
也感谢[知乎](https://www.zhihu.com/signup?next=%2F)这个平台和热爱帮助别人的答题者，通过这里我结识了我的几本“启蒙书”，虽然说了解到CSS女神[@LEA VEROU](http://lea.verou.me/)不是在这几本书里，但是它们也功不可没啊，哈(ps.现在都还在学，梦想将来变大牛~)。

提到书就必须感谢这个机构了——[图书馆](http://www.lnlib.com/)，没它真不行，还有[市图](http://www.sylib.net/web/index)自习室。（ps.每每去都看到年轻的学生，真是羡慕他们啊）;最后感谢在[Segmentfault](https://segmentfault.com/a/1190000007399804)上发文的[@simon_woo](https://segmentfault.com/u/simon_woo)，这个在线简历能在github上发布大部分都靠研究那个文章，自己坑坑洼洼也走过来了，Thanks！
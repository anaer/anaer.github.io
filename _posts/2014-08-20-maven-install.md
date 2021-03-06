---
layout: post
title: "maven安装"
description: ""
category: maven
tags: [maven]
---

### Maven安装配置

#### Maven安装

    1. 下载maven包, 上官网下载 *.tar.gz
    2. 解压安装包 解压路径随意指定 如：/usr/local
    tar -xvf *.tar.gz
    3. 设置环境变量 .bashrc
    export MAVEN_HOME=/usr/local/maven
    export PATH=$PATH:$MAVEN_HOME/bin
    4. 查询maven版本
    mvn -v

    命令参数:
    -o offline"

    使用Maven的range dependency机制自动更新项目所需jar包

      Range         Meaning
    　(,1.0] 　     version ≤ 1.0
    　1.0    　     固定1.0版本
    　[1.0]
    　[1.2,1.3]  　 1.2 ≤ version ≤ 1.3
    　[1.0,2.0)  　 1.0 ≤ version ≤ 2.0
    　[1.5,) 　     version ≥ 1.5
    　(,1.0],[1.2,) x ≤ 1.0 || x ≥ 1.2 (区间用英文逗号隔开)
    　(,1.1),(1.1,) version ≠ 1.0

#### Maven生命周期
  Maven拥有三套互相独立的生命周期，它们分别是clean,default和site。clean生命周期的目的是清理项目，default生命周期的目的是构建项目，而site生命周期的目的是建立项目站点。
  Clean生命周期：
    clean生命周期的目的是清理项目，它包含三个阶段：
    - pre-clean:执行一些清理前需要完成的工作
    - clean:清理上一次构建生成的文件
    - post-clean:执行一些清理后需要完成的工作
    default生命周期：
    - validate
    - initialize
    - generate-source
    - process-sources：处理项目主资源文件。一般来说，是对src/main/resource目录的内容进行变量替换等工作后，复制到项目输出的主classpath目录中。
    - generate-resources
    - process-resources
    - compile：编译项目的源代码，一般来说，是编译src/main/java目录下的Java文件至项目输出的主classpath目录中
    - process-classes
    - generate-test-sources
    - process-test-sources：处理项目测试资源文件。一般来说，是对src/test/resource目录的内容进行变量替换等工作后，复制到项目输出的主classpath目录中。
    - generate-test-resources
    - process-test-resources
    - test-compile：编译项目的测试代码。一般来说，是编译src/test/java目录下的Java文件至项目输出的测试classpath目录中
    - process-test-classes
    - test：使用单元测试框架运行测试，测试代码不会被打包或部署
    - prepare-package
    - package：接受编译好的代码，打包成可发布的版本，如JAR
    - pre-integration-test
    - integration-test
    - post-integration-test
    - verify
    - install：将包安装到Maven本地仓库，供本地其他Maven项目使用
    - deploy：将最终的包复制到远程仓库，供其他开发人员和Maven项目使用
    site生命周期:
    site生命周期的目的是建立和发布项目站点，Maven能够基于POM所包含的信息，自动生成一个友好的站点，方便团队交流和发布项目信息。该生命周期包含如下阶段：
    - pre-site：执行一些在生成项目站点之前需要完成的工作
    - site：生成项目站点文档
    - post-site：执行一些在生成项目站点之后需要完成的工作
    - site-deploy：将生成的项目站点发布到服务器上
    命令行与生命周期：
    从命令行执行Maven任务的最主要方式就是调用Maven的生命周期阶段。下面以一些常见的Maven命令为例，解释其执行的生命周期阶段：
        - $mvn clean : 该命令调用clean生命周期的clean阶段。实际执行的阶段为clean生命周期的pre-clean和clean阶段
        - $mvn test：该命令调用default生命周期的test阶段。实际执行的阶段为default生命周期的validate、initialize等，知道test的所有阶段。这也解释了为什么在执行测试的时候，项目的代码能够自动得以编译
        - $mvn clean install：该命令调用clean生命周期的clean阶段和default生命周期的install阶段。实际执行的阶段为clean生命周期的pre-clean、clean阶段，以及default生命周期的从validate至install的所有阶段。该命令结合了两个生命周期，在执行真正的项目构建之前清理项目是一个很好的实践
        - $mvn clean deploy site-deploy：该命令调用clean生命周期的clean阶段，default生命周期的deploy阶段，以及site生命周期的site-deploy周期。实际执行的阶段为clean生命周期的pre-clean、clean阶段，default生命周期的所有阶段，以及site生命周期的所有阶段。该命令结合了Maven所有三个生命周期，且deploy为default生命周期的最后一个阶段，site-deploy为site生命周期的最后一个阶段。

#### Maven中Scope的作用

<dependency>中还引入了<scope>，它主要管理依赖的部署。目前<scope>可以使用5个值：

* compile，compile是默认的范围；如果没有提供一个范围，编译范围依赖在所有的classpath 中可用，同时它们也会被打包。而且这些dependency会传递到依赖的项目中。
* provided，provided 声明了dependency 由JDK或者容器提供。例如如果开发了一个web 应用，可能在编译 classpath 中需要可用的Servlet API 来编译一个servlet，但是你不会想要在打包好的WAR 中包含这个Servlet API；这Servlet API JAR 由你的应用服务器或者servlet容器提供。已提供范围的依赖在编译classpath （不是运行时）可用。它们不是传递性的也不会被打包。
* runtime，runtime 依赖在运行和测试系统的时候需要，但在编译的时候不需要。比如可能在编译的时候只需要JDBC API JAR，而只有在运行的时候才需要JDBC驱动实现。
* test，test范围依赖 在一般的编译和运行时都不需要，它们只有在测试编译和测试运行阶段可用。
* system，类似provided，需要显式提供包含依赖的jar，Maven不会在Repository中查找它。


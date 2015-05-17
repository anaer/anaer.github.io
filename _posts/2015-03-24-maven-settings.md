---
layout: post
title: "Maven settings.xml 配置"
description: "Maven settings.xml 配置"
category:Maven
tags: [Maven]

---

#### settings_osc.xml

```xml
<settings>
<localRepository>C:/Users/Administrator/.m2/repository</localRepository>
  <mirrors>
    <mirror>
      <id>nexus</id>
      <mirrorOf>*</mirrorOf>
      <name>Nexus osc</name>
      <url>http://maven.oschina.net/content/groups/public/</url>
    </mirror>
  </mirrors>
  <profiles>
    <profile>
        <id>nexus</id>
        <repositories>
            <repository>
                <id>nexus</id>
                <name>local private nexus</name>
                <url>http://maven.oschina.net/content/groups/public/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </repository>
        </repositories>
        <pluginRepositories>
            <pluginRepository>
                <id>nexus</id>
                <name>local private nexus</name>
                <url>http://maven.oschina.net/content/groups/public/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </pluginRepository>
        </pluginRepositories>
    </profile>
  </profiles>
  <activeProfiles>
    <!--make the profile active all the time -->
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
    <servers>
         <server>
           <id>nexus</id>
           <username>readOnly</username>
           <password>hscmreadonly</password>
         </server>
     </servers>
</settings>
```

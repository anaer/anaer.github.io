---
layout: post
title: "Java httpClient faq"
description: ""
category: Java
tags: [Java,Http]

---

#### WARN   HttpMethodBase - Cookie rejected: "$Version="1"; BAIDUID="A4289C733233324669BDD39C3D00F034:FG=1"; $Path="/"; $Domain=".baidu.com"". Domain attribute ".baidu.com" violates RFC 2109: host minus domain may not contain any dots
    设置CookiePolicy
    
```java
    /**
     * http get方法.
     * @param url 链接
     * @param nameValuePairs 键值参数
     * @return 响应串
     */
    public static String get(String url, NameValuePair... nameValuePairs) {
        String result = "";
        try {
            HttpClient client = new HttpClient();
            HttpMethod method = new GetMethod(url);
            HttpMethodParams params = new HttpMethodParams();
            params.setContentCharset("UTF-8");
            params.setCookiePolicy(CookiePolicy.BROWSER_COMPATIBILITY);
            method.setParams(params);
            method.setQueryString(nameValuePairs);
            client.executeMethod(method);
            result = method.getResponseBodyAsString();
            method.releaseConnection();
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
```
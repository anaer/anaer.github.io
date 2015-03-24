---
layout: post
title: "spring validator校验 "
description: ""
category: Java
tags: [Java, Spring]
---

### Spring Validator 

#### 

1. 实现validator接口

```java
package com;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.domain.Operator;

public class OperatorValidator implements Validator {

  @Override
  public boolean supports(Class<?> clazz) {
    return Operator.class.equals(clazz);
  }

  @Override
  public void validate(Object obj, Errors e) {
    ValidationUtils.rejectIfEmpty(e, "operId", "null");
    Operators  = (Operator) obj;
    if (s.getOperId() < 18) {
      e.rejectValue("operId", "100");
    } else if (s.getOperId() > 50) {
      e.reject("operId", "2000");
    }
  }

}
```

2. 调用

```java
  @RequestMapping(value = "/operList.json")
  public @ResponseBody
  Map<String, Object> gridDataJson(Operator operator, BindingResult br, int limit, int start, ModelMap mm) throws Exception {
    new OperatorsValidator().validate(operator, br);
    if (br.hasErrors()) {
      System.out.println("123123123:" + br);
      Map<String, Object> map = new HashMap<String, Object>();
      map.put("success", "false");
      return map;
    }
  }
```

### 参考
  * [JSR 303 - Bean Validation 介绍及最佳实践 ](http://www.ibm.com/developerworks/cn/java/j-lo-jsr303/index.html)

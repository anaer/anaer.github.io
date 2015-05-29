---
layout: post
title: "Spring事务详解"
description: "介绍Spring事务的概念，和日常用法"
category: Java
tags: [spring, 事务]
---

## 事务接口定义

在Spring中，事务是通过TransactionDefinition接口定义的。其中定义了访问事务属性的相关方法。核心代码如下：

```java
public interface TransactionDefinition {
    int getPropagationBehavior();   // 事务传播行为
    int getIsolationLevel();        // 事务隔离级别
    int getTimeout();               // 事务超时
    boolean isReadOnly();           // 事务的只读属性
    String getName();               // 事务名称，供Web容器显示用，可为空
}
```
### 事务传播行为

事务传播行为是指，在开始当前事务之前，针对当前事务上下文环境，即当前是否存在事务，的执行行为。在`TransactionDefinition`接口定义中包括了如下几个表示传播行为的常量：

1. `PROPAGATION_REQUIRED`：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
1. `PROPAGATION_REQUIRES_NEW`：创建一个新的事务，如果当前存在事务，则把当前事务挂起。
1. `PROPAGATION_SUPPORTS`：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
1. `PROPAGATION_NOT_SUPPORTED`：以非事务方式运行，如果当前存在事务，则把当前事务挂起。
1. `PROPAGATION_NEVER`：以非事务方式运行，如果当前存在事务，则抛出异常。
1. `PROPAGATION_MANDATORY`：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
1. `PROPAGATION_NESTED`：如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于`TransactionDefinition.PROPAGATION_REQUIRED`。

其中前面的六种事务传播行为是Spring从EJB中引入的，他们具有相同的概念。而PROPAGATION_NESTED是Spring所特有的。以PROPAGATION_NESTED启动的事务内嵌于外部事务中（如果存在外部事务的话），此时，内嵌事务并不是一个独立的事务，它依赖于外部事务的存在，只有通过外部的事务提交，才能引起内部事务的提交，嵌套的子事务不能单独提交。另外，外部事务的回滚也会导致嵌套子事务的回滚。

### 事务隔离级别

隔离级别是指若干个并发的事务之间的隔离程度。`TransactionDefinition`接口中定义了五个表示隔离级别的常量：

1. `TransactionDefinition.ISOLATION_DEFAULT`：这是默认值，表示使用底层数据库的默认隔离级别。对大部分数据库而言，通常这值就是`TransactionDefinition.ISOLATION_READ_COMMITTED`。
1. `TransactionDefinition.ISOLATION_READ_UNCOMMITTED`：该隔离级别表示一个事务可以读取另一个事务修改但还没有提交的数据。该级别不能防止脏读和不可重复读，因此很少使用该隔离级别。
1. `TransactionDefinition.ISOLATION_READ_COMMITTED`：该隔离级别表示一个事务只能读取另一个事务已经提交的数据。该级别可以防止脏读，这也是大多数情况下的推荐值。
1. `TransactionDefinition.ISOLATION_REPEATABLE_READ`：该隔离级别表示一个事务在整个过程中可以多次重复执行某个查询，并且每次返回的记录都相同。即使在多次查询之间有新增的数据满足该查询，这些新增的记录也会被忽略。该级别可以防止脏读和不可重复读。
1. `TransactionDefinition.ISOLATION_SERIALIZABLE`：所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别。

#### 脏读

脏读就是读取了“假数据”。例如以下流程，其中事务A的读取就是脏读。

1. 事务A开始。
1. 事务B开始，修改记录E的值。
1. 事务A读取E的值。
1. 事务B回滚。
1. ...

#### 不可重复读

不可重复是，在同一个事务中，两次查询同一条记录，但返回结果不相同。例如：

1. 事务A开始，查询记录E。
1. 事务B开始，修改记录E的值，并提交事务。
1. 事务A再次读取E的值。
1. ...

#### 幻读

幻读是，在同一个事务中，两次执行同一个查询，但返回结果不相同。例如：

1. 事务A开始，并查询表T的总记录数。
1. 事务B开始，增加一条数据到表T中，并提交事务。
1. 事务A再次查询表T的总记录数。
1. ...


### 事务超时

事务超时，就是指一个事务所允许执行的最长时间，如果超过该时间限制但事务还没有完成，则自动回滚事务。在 TransactionDefinition 中以 int 的值来表示超时时间，其单位是秒。

### 事务的只读属性

事务的只读属性是指，对事务性资源进行只读操作或者是读写操作。所谓事务性资源就是指那些被事务管理的资源，比如数据源、 JMS 资源，以及自定义的事务性资源等等。如果确定只对事务性资源进行只读操作，那么我们可以将事务标志为只读的，以提高事务处理的性能。在 TransactionDefinition 中以 boolean 类型来表示该事务是否只读。

### 事务的回滚规则

通常情况下，如果在事务中抛出了未检查异常（继承自 RuntimeException 的异常），则默认将回滚事务。如果没有抛出任何异常，或者抛出了已检查异常，则仍然提交事务。这通常也是大多数开发者希望的处理方式，也是 EJB 中的默认处理方式。但是，我们可以根据需要人为控制事务在抛出某些未检查异常时任然提交事务，或者在抛出某些已检查异常时回滚事务。

## 声明式事务管理

### Spring 的声明式事务管理概述

Spring 的声明式事务管理在底层是建立在 AOP 的基础之上的。其本质是对方法前后进行拦截，然后在目标方法开始之前创建或者加入一个事务，在执行完目标方法之后根据执行情况提交或者回滚事务。

### 基于 <tx> 命名空间的声明式事务管理

Spring 2.x 引入了`<tx>`命名空间，结合使用`<aop>`命名空间，使配置变得更加简单和灵活。另外，得益于`<aop>`命名空间的切点表达式支持，声明式事务也变得更加强大。关键的配置信息如下：

```xml
<tx:advice id="serviceAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="save*" propagation="REQUIRED"/>
        <tx:method name="delete*" propagation="REQUIRED"/>
        <tx:method name="update*" propagation="REQUIRED"/>
        <tx:method name="add*" propagation="REQUIRED"/>
        <tx:method name="find*" propagation="REQUIRED"/>
        <tx:method name="query*" propagation="REQUIRED"/>
    </tx:attributes>
</tx:advice>

<aop:config>
    <aop:pointcut id="servicePointcut" expression="execution(* com.wenin819.service.*.*(..))"/>
    <aop:advisor advice-ref="serviceAdvice" pointcut-ref="servicePointcut"/>
</aop:config>
```

配置说明：

1. `tx:attribute`标签配置是，要进行事务控制的方法名和对应的事务属性配置，其中`name`可以用`*`通配符，`propagation`配置规则如下。
    1. 传播行为 `[，隔离级别] [，只读属性] [，超时属性] [不影响提交的异常] [，导致回滚的异常]`
    1. 传播行为是唯一必须设置的属性，其他都可以忽略，Spring为我们提供了合理的默认值。
    1. 传播行为的取值必须以`PROPAGATION_`开头，具体见上文中传播行为说明。
    1. 隔离级别的取值必须以`ISOLATION_`开头，具体见上文中隔离级别说明。
    1. 如果事务是只读的，那么我们可以指定只读属性，使用`readOnly`指定。否则我们不需要设置该属性。
    1. 超时属性的取值必须以`TIMEOUT_`开头，后面跟一个int类型的值，表示超时时间，单位是秒。
    1. 不影响提交的异常是指，即使事务中抛出了这些类型的异常，事务任然正常提交。必须在每一个异常的名字前面加上`+`。异常的名字可以是类名的一部分。比如`+RuntimeException`、`+tion`等等。
    1. 导致回滚的异常是指，当事务中抛出这些类型的异常时，事务将回滚。必须在每一个异常的名字前面加上`-`。异常的名字可以是类名的全部或者部分，比如`-RuntimeException`、`-tion`等等。
    1. 由于使用了切点表达式，我们就不需要针对每一个业务类创建一个代理对象了。另外，如果配置的事务管理器 Bean 的名字取值为`transactionManager`，则我们可以省略`<tx:advice>`的`transaction-manager`属性，因为该属性的默认值即为`transactionManager`。
1. `aop:pointcut`标签配置是，要进行事务控制类和方法。其中第一个`*`代表返回值，第二`*`代表service下子包，第三个`*`代表方法名，`(..)`代表方法参数。
1. `aop:advisor`标签配置是，把上面配置的事务管理两部分整合起来作为整个事务管理。

### 基于 @Transactional 的声明式事务管理

除了基于命名空间的事务配置方式，Spring 2.x 还引入了基于 Annotation 的方式，具体主要涉及`@Transactional`标注。`@Transactional`可以作用于接口、接口方法、类以及类方法上。当作用于类上时，该类的所有`public`方法将都具有该类型的事务属性，同时，我们也可以在方法级别使用该标注来覆盖类级别的定义。注解的核心方法如下：

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional {
    String value() default "";
    Propagation propagation() default Propagation.REQUIRED; // 传播行为
    Isolation isolation() default Isolation.DEFAULT;    // 隔离级别
    int timeout() default TransactionDefinition.TIMEOUT_DEFAULT;    // 超时属性
    boolean readOnly() default false;   // 只读属性
    Class<? extends Throwable>[] rollbackFor() default {};  // 不影响提交的异常类
    String[] rollbackForClassName() default {}; // 不影响提交的异常类名
    Class<? extends Throwable>[] noRollbackFor() default {};    // 导致回滚的异常类
    String[] noRollbackForClassName() default {};   // 导致回滚的异常类名
}
```

Spring 使用 BeanPostProcessor 来处理 Bean 中的标注，因此我们需要在配置文件中作如下声明来激活该后处理 Bean，配置如下：

```xml
<tx:annotation-driven transaction-manager="transactionManager"/>
```

与前面相似，transaction-manager 属性的默认值是 transactionManager，如果事务管理器 Bean 的名字即为该值，则可以省略该属性。

虽然`@Transactional`注解可以作用于接口、接口方法、类以及类方法上，但是 Spring 小组建议不要在接口或者接口方法上使用该注解，因为这只有在使用基于接口的代理时它才会生效。另外，`@Transactional`注解应该只被应用到`public`方法上，这是由 Spring AOP 的本质决定的。如果你在`protected`、`private`或者默认可见性的方法上使用`@Transactional`注解，这将被忽略，也不会抛出任何异常。

基于`<tx>`命名空间和基于`@Transactional`的事务声明方式各有优缺点。基于`<tx>`的方式，其优点是与切点表达式结合，功能强大。利用切点表达式，一个配置可以匹配多个方法，而基于`@Transactional`的方式必须在每一个需要使用事务的方法或者类上用`@Transactional`标注，尽管可能大多数事务的规则是一致的，但是对`@Transactional`而言，也无法重用，必须逐个指定。另一方面，基于`@Transactional`的方式使用起来非常简单明了，没有学习成本。开发人员可以根据需要，任选其中一种使用，甚至也可以根据需要混合使用这两种方式。

## 参考文章

- [全面分析 Spring 的编程式事务管理及声明式事务管理](http://www.ibm.com/developerworks/cn/education/opensource/os-cn-spring-trans/)
- [Spring声明式事务配置管理方法](http://www.cnblogs.com/rushoooooo/archive/2011/08/28/2155960.html)
- [详解spring事务属性](http://www.iteye.com/topic/78674)

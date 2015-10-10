---
layout: post
title: "Code Review"
description: ""
category: Java
tags: [Java]
---

#### 常见问题
  * 文档注释
  * 参数判空
  * 常量定义
  * 无用的import
  * 修饰符
  * 命名规范
  * 硬编码
  * 字符串判空 直接调用StringUtils.isEmpty()
  * 代码可读性
  * 提取公共方法到父类
  * 列表 宽度 总结
  * 格式化 数字
    format(数字, 保留小数, 单位); 适用金额 份额, 可分成两个, 一个返回带html标签的/或者添加个是否带标签的参数
    longToDate()
    longToTime()
    longToDateTime()
    formaturl()

### 网上总结的要点

1.

    Result result=new Result();
    result.setCode(201);
    result.setStr(re);
    result.setMessage("获取id成功");

    建议：对常用的功能，可以：新增Constructor，把4行code用1行搞定。

    Result result=new Result(code, str, msg);

2.

    StringBuffer stringBuffer=new StringBuffer();
    String[] formatStr=snFormatStr.split(splitChar);
    for(String inStr:formatStr){

    //判断以str开头，不分大小写
    if(inStr.matches("^[Ss][Tt][Rr].*")){
    stringBuffer.append(processStr(inStr));

    建议：StringBuffer改成StringBuilder。
    倒数第二行用commons-lang3的，既能避免硬编码，又避免了正则表达式。
    StringUtils.startsWithIgnoreCase(CharSequence, CharSequence)

3.

    private String processDate(String str) throws Exception{
    String[] strings=str.split(innerChar);
    String def="yyyyMMdd";

    建议：凡是属于 “无状态的” “通用的”功能，可以放在Util.java里。
    如果确实需要硬编码，放在Util.java里，让它们只永远出现一次。

4.

    String re="";
    ……
    if(ar.length>1&&add!=""){

    建议：org.apache.commons.lang3.StringUtils.EMPTY
    重用常量，不要自己新创建。

5.

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    if (LOGGER.isDebugEnabled()) {
    LOGGER.debug("Attempting to resolve a principal...");

    建议：既然用了slf4j，里面就封装了判断log level的功能。
    LOGGER.isDebugEnabled()是多余的。

6.

    if (attributes == null) {
        return null;
    ……
    if (itemNo.length()!=3) {
        throw new RuntimeException("ItemCode has exceed 3 bits !");

    建议：
    jdk，throw new IllegalArgumentException(...);
    jdk，throw new IllegalStateException(...);
    org.springframework.util.Assert.isTrue(boolean, String)
    org.springframework.util.Assert.state(boolean, String)

7.

    if (null != sos) {
        try {
            sos.close();
        } catch (IOException e) {
             LOGGER.error("handleRequest 关闭流出现异常 ！ ",e);
        }
    }

    建议：
    org.apache.commons.io.IOUtils.closeQuietly(OutputStream)
    org.apache.commons.io.IOUtils.closeQuietly(Writer)

8.

    public void setApplicationContext(final ApplicationContext applicationContext) {
        super.setApplicationContext(applicationContext);
        this.applicationContext = applicationContext;
    }

    建议：既然父类已经有了ApplicationContext，子类的就是无用的，可以删除。

 9.

    public class ImageVaditeAuthenticationViaFormAction
    if (this.credentialsBinder != null && this.credentialsBinder.supports(credentials.getClass())) {
        this.credentialsBinder.bind(request, credentials);
    }

    建议：Web层里，传递给Service层的东东，不应该有Servlet API。

10.

    UserCacheVO vo = new UserCacheVO();
    vo.setLoginIP(request.getRemoteAddr());
    vo.setLoginTime(DateUtil.DateTimeToString(new Date()));
    vo.setResourceNo(resourceNo);
    vo.setUserName(loginId);
    vo.setUserSymbol(userSymbol);

    建议：做成UserCacheVO vo = new UserCacheVO(w,x,y,z);

    有人说：对于多个参数是相同类型,比如都是string,采用构造方法构造比较容易出现调用时
    参数错位的错误,而且也不太容易发现

    解决方式：这样定义Constructor，每5个参数放在一行，
    任何IDE的排版（都是一行有80/120/160个字符），都会保持整齐队形了。

11.

    建议：合并。每个package里，有几个几十个类是正常的。
    com.gy.prvg.acl.constant里的多个常量类，合并为一个。Enum，也做在常量类里面。
    （2014/ 09/ 22增补）目前公司里还有个类似的状况，工程师们喜欢狂建项目——
    只有几个类的十几个类的，都能做个单独的项目出来。
    建议：一个工程有了2000--4000个类，可以考虑拆分。几百个类的，先保持在一起。

    好处：便于开发，便于查找，便于检错，便于调试，便于维护，便于测试。

12.

    public static final List<AccountType> AllTypes() {
        List<AccountType> types = new ArrayList<AccountType>();
        for (AccountType accountType : AccountType.values()) {
            types.add(accountType);

        }
        return types;
    }

    建议：List<TimeUnit> list = java.util.Arrays.asList(TimeUnit.values()); 一句话搞定。

13.

    @Override
    public String toString() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("loginId", loginId);
        map.put("resourceNo", resourceNo);
        map.put("deptNo", deptNo);
        map.put("userName", userName);
        map.put("userCode", userCode);
        map.put("cardId", cardId);
        map.put("phone", phone);
        map.put("email", email);
        map.put("status", status);
        map.put("roleType", roleType);
        map.put("corpName", getCorpName());
        map.put("deptNo", getDeptName());
        return JSON.toJSONString(map);

    建议：
    可以用JSON.toJSONString(this);一句搞定。或者加上@JsonIgnore能屏蔽些field。
    搞json格式，全部项目应该用统一的jar。推荐：fastjson。

14.

    import org.apache.log4j.FileAppender;
    import org.apache.log4j.Layout;
    import org.apache.log4j.helpers.CountingQuietWriter;
    import org.apache.log4j.helpers.LogLog;
    import org.apache.log4j.helpers.OptionConverter;
    import org.apache.log4j.spi.LoggingEvent;

    public class AclLogFileAppender extends FileAppender

    建议：org.apache.log4j.RollingFileAppender应该足够用了，不用自建class。

15.

    public enum RoleType {
        PlatAdmin("平台管理员"),
        CorpAdmin("公司管理员"),
        Normal("普通角色");

    if ("财务视图".equals(view.getViewName())) {
        view.setViewType("Finance");
    }

    if ("管理视图".equals(view.getViewName())) {
        view.setViewType("Manage");
    }

    if ("参数视图".equals(view.getViewName())) {
        view.setViewType("Param");

    建议：用ASCII表里的英文字母或数字。

16.

    public interface ILoginService {
        void loadPrivilegeItemList(String resourceNo, String loginId, HttpServletRequest request);
        HttpResult logon(HttpServletRequest request);

    建议：
    团长能够指挥士兵，士兵不能指挥团长。
    上层能调用下层，下层不能调用上层。
    Service层里，不应该有Web层api。

17.

    if (data.get("uri").indexOf(action.getItemContent())>=0) {
    建议：java.lang.String.contains(CharSequence)

18.

    int len = roleCode.length() - 3;
    int maxNo = Integer.valueOf(roleCode.substring(len));
    String leafNo = String.valueOf(maxNo + 1);
    leafNo = (leafNo.length() == 3) ? leafNo : (leafNo.length() == 2 ? "0" + leafNo : "00" + leafNo);
    code = roleCode.substring(0, len) + leafNo;
    stringBuilder.append(LoUtils.fill0InStr(calcDebitCount+"", 3, 0));

    建议：org.apache.commons.lang3
    StringUtils.leftPad(java.lang.String str, int size, char padChar)
    StringUtils.leftPad(java.lang.String str, int size, java.lang.String padStr)

    建议：
    calcDebitCount+""，这种用法在不同的jdk和不同的编程语言之间都可能有毛病。例如：
    assertEquals("1.23456789E7", 12345678.90 + "");
    assertEquals("1.23456789E7", Double.toString(12345678.90));
    assertEquals("1.23456789E7", String .valueOf(12345678.90));
    这3个都变味了。所以，使用这些功能之前，要确保正确性。

19.

    try {
        ……
    } catch (SystemException se){
        LOGGER.error(" Finding listCorporation is error !",se);
        throw new SystemException(se.getErrorCode(), se.getMessage());
    } catch (Exception e) {
        LOGGER.error(" Finding listCorporation is error !",e);
        throw new SystemException(ErrorCode.ERROR_9004,"查询公司出现异常！", e);

    每个项目里的每层的每个类里，都有这些catch，有实际意义吗？
    白白的增加了几千几万行code。

    建议：绝大多数情况，不需要catch。public void someMethod() throws Exception是最简洁的。
    只是在必要之处，例如：返回给页面之前，才做catch。

    附：java的checked exception是个设计错误。
    按照现代的程序理论：在任何地方，catch都是可有可无的，不应该强迫搞catch。
    Java5以前的Runnable  run()，就是强迫catch { }，让开发者感到臃肿。
    Java5+的Callable，V call()  throws Exception; catch { } 就是可有可无的，很清爽。

20.

    userRole.setRoleName(URLDecoder.decode(userRole.getRoleName(), "UTF-8"));

    建议：
    org.apache.commons.lang3.CharEncoding.UTF_8
    凡是可能有编码毛病之处，用POST方式，
    把org.springframework.web.filter.CharacterEncodingFilter当做过滤器，就实现了统管，
    就不用在多处搞多个URLDecoder.decode()了。

21.

    int index = StringUtil.isEmpty(pageLeafCode) ? 0 : pageLeafCode.indexOf("[");
    if (index > 0) {
        pageLeafCode = pageLeafCode.substring(index + 1,pageLeafCode.length() - 1);

    建议：org.apache.commons.lang3.StringUtils.substringAfter(String, String)

22.

    public String toString() {
        return "Leaf [leafId=" + leafId + ", leafName=" + leafName
        + ", leafCode=" + leafCode + ", nodeCode=" + nodeCode
        + ", leafType=" + leafType + ", leafContent=" + leafContent
        + ", description=" + description + ", subSystemId="
        + subSystemId + "]";

    建议：在基类里定义toString()一次就行了。
    org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString(
    this, ToStringStyle.SHORT_PREFIX_STYLE);

23.

    Map<String,String> data = new HashMap<>();
    data.put("uri", request.getRequestURI());
    data.put("loginId", SSOConstant.getLoginId(request));
    data.put("resourceNo", SSOConstant.getResourceNo(request));

    建议：凡是常用的hardcode，都做成静态常量。

24.

    CacheLoadUtil.getRelationMap().put(roleCode, map);
    建议：缓存的东东，不应该在static map的里面，而应该在obj map里面。

25.

    public static String objectToString(Object obj){
        return obj.toString();

    建议：删除这个函数。

26.

    public static String replaceSpecialStr(Object value){
        if(null != value && !"".equals(value)){
        return value.toString().replaceAll("'", "’").trim();

    建议：
    org.apache.commons.lang3.StringUtils.isNotEmpty(CharSequence)
    java.lang.String.replaceAll(String, String) 适合于：正则表达式。
    java.lang.String.replace(CharSequence, CharSequence) 更适合此处。

27.

    public static String nullConvert(String value){
    return null==value?"":value;

    建议：该报错的时候，就报错，用org.springframework.util.Assert.notNull(Object)
    如果确实有用，用：org.apache.commons.lang3.StringUtils.defaultString(String)

28.

    void modifyAuditStatus(Long[] ids, String operType, Map<String,String> data)
    建议：Long[] ids改成：List<Long>，面向对象编程，少用array，多用List。

29.

    Map<String, List<Role>> map = new HashMap<String,List<Role>>();
    map.put("leftRoles", leftRoles);
    map.put("rightRoles", rightRoles);

    建议：既然只放两个，可以用：org.apache.commons.lang3.tuple.Pair.of(left, right)

30.

    for (String loginId : addUsers) {
        UserRole ur = new UserRole();
        ur.setCreated(now);
        ur.setCreatedBy(operator);
        ur.setIsActive('0');
        ur.setLoginId(loginId);
        ur.setResourceNo(resourceNo);
        ur.setRoleCode(roleCode);
        ur.setStatus("1");
        ur.setUpdated(now);
        ur.setUpdatedBy(operator);

    建议：
    ur.setIsActive('0'); ur.setStatus("1"); 把类似的风格做成两样东东了，建议都用int风格。

    建议：
    用多参数的Constructor，把10行变成1行。
    有人对此提出疑问：把10个参数放在Constructor里，太多了……
    他说的，适合于啥情况呢？

    OO设计，有几条重要原则：
    （A）迪米特法则——“最少知识原则”。“ 不要和陌生人说话”。
    （B）强内聚，弱耦合。即：关系越少越好。
    UserRole，里面所有的属性都是“同类的傻傻的boolean/int/String/…”，是很简单的容器，

    不属于OO设计范围，就算Constructor里有200+个参数，也是正确的。

31.

    if (StringUtil.isNotEmpty(viewVO.getViewName())) {
        viewVO.setViewName("%" + viewVO.getViewName() + "%");
        where.append(" and viewName LIKE :viewName ");
    }

    if (StringUtil.isNotEmpty(viewVO.getViewType())) {
        viewVO.setViewType("%" + viewVO.getViewType() + "%");
        where.append(" and viewType LIKE :viewType ");
    }

    if (StringUtil.isNotEmpty(viewVO.getCreatedBy())) {
        viewVO.setCreatedBy("%" + viewVO.getCreatedBy() + "%");
        where.append(" and createdBy LIKE :createdBy ");
    }

    建议：
    把"%"改成'%'

    public static final char SQL_WILDCARD = '%';
    把常用的拼接功能做成个静态函数：
    public static void wildcardSqlWord(String str) {
        return Util.SQL_WILDCARD + str + Util.SQL_WILDCARD;
    }

32.

    // 转换用户状态
    switch (u.getStatus()) {
        case "0":
            u.setStatus("New");// 新建
            break;
        case "1":
            u.setStatus("Normal");// 正常
            break;
        case "2":
            u.setStatus("Forbidden");// 禁用
            break;
        default:
            u.setStatus("Illegal");// 非法
            break;

    // 转换参数状态
    switch (sys.getStatus()) {
        case "0":
            sys.setStatus("Normal");// 正常
            break;
        case "1":
            sys.setStatus("Forbidden");// 禁止
            break;
        default:
            sys.setStatus("Illegal");// 非法
            break;
    }

    // 操作级别转换
    switch (sys.getOperationGrade()) {
        case "0":
            sys.setOperationGrade("无");
            break;
        case "1":
            sys.setOperationGrade("查询");
            break;
        case "2":
            sys.setOperationGrade("修改");
            break;
        case "3":
            sys.setOperationGrade("删除");
            break;
        case "4":
            sys.setOperationGrade("全部");
            break;
        default:
            sys.setOperationGrade("Illegal");
            break;

    建议：
    在default后面，不要写break。
    switch(x)里，尽量不用String，而用enum。
    如果确实需要switch(数字)，就在enum里加入成员常量。例如：
    public enum CmdCategory implements MyEnum {
        /**
        * <code>dummy = 0;</code>
        */
        dummy(0, 0),
        /**
        * 统一官网
        */
        official(1, 10000),
        /**
        * 个人系统
        */
        person(2, 20000),
        /**
        * 企业系统
        */
        company(3, 30000),

33.

    private CacheLoadUtil() {
        super();
    }

    public class StringUtil {
        private StringUtil(){
        super();
    };

    建议：
    public Util() { // 这里用了public，是为了覆盖率的完美。
        throw new java.lang.NoSuchMethodError();
    }

34.

    String sql = " select l.* from T_PVG_LEAF l join T_PVG_ROLE_LEAF rl on l.leafCode
    建议：应该回避”l”。
    ”l”长得很像数字1和i的大写字母，java的语言规范中都回避，long 3用”3L”表示。

35.

    if (obj == null) {
        result = "PO00000000";
    }else {
        result = LeafRelation.nextBriefCode(String.valueOf(obj));
    }

    建议：如果两个长度都中等，可以合并为一行，用java的三元运算符：
    result = (null == obj) ? x : y

36.

    public class CacheLoadUtil {
        /**
         * <p>以企业资源号为key 公司对象为value</p>
         */
        private static final Map<String, Corporation> CORPS = new HashMap<String, Corporation>();

        /**
         * <p>以部门编号为key 部门对象为value</p>
         */
        private static final Map<String, Department> DEPTS = new HashMap<String,Department>();

        /**
         * <p>以角色代码为key 角色对象为value</p>
         */

        private static final Map<String, Role> ROLES = new HashMap<String,Role>();

    建议：缓存，不要搞static Map，用实例化的对象，最好用框架EHCache、Memcache……

37. 推荐的Java测试组件

    页面层：HtmlUnit。普通的页面和js（jQuery等），它都能搞定。
    业务层：JUnit + Mockito/EasyMock
    持久层：JUnit + HsqlDB/H2/Derby + Spring Context
    测试结果报表：Cobertura / JaCoCo
    构建工具：Maven / Ant。在命令行上（不依赖于IDE），用一条的指令搞定全部构建的东东。

38. 自动化测试的重要信息

    （1） 想要在程序这条路上走几十年，搞自动化测试是最正确的路线。
    （2） 参考 张林 的http://qc.gyist.com/Wiki.jsp?page=SoftwareTesting
    （3） 参考第37节
    （5） 假设某版本app有900个bug，有了“自动化测试”，能快速检查出来820个，

    30个被测试组检查出来，10个在UAT环境出现，30个在生产环境出现，
    还剩10个永远也不会发现。这是比较理想的情况。

    假如没有“自动化测试”，820个就要分担给“测试组”、“UAT”和“生产环境”来暴露了。
    这会极大的增加程序员返工的次数和沟通的次数。我们绝不想要这种状况。
    这会极大的增加公司的经营成本。老板绝不想要这种状况！！！

    原则：软件bug，越早发现，成本越低。

39. 有人问：为什么推荐JUnit4？为什么抛弃TestNG？

    JUnit，简单易用，最好了。主流版本是：3.8.x和4.x。JUnit4，约束更少，功能更强大。
    Testng，本身过度复杂，在各大IDE上的版本都不同，
    本身也有内存泄露等毛病，新版本久不更新，应该抛弃。

40.

    public static final Map<String, Corporation> getCorps() throws SystemException {
        if (CORPS.isEmpty()) {
            List<Corporation> cps = SpringBeanUtil.getBean(AclConstants.CORP_SERVICE, CorporationServiceImpl.class).queryCorporationAll();
        …………

    public class SpringBeanUtil implements ApplicationContextAware {
        private static ApplicationContext ctx;
        private SpringBeanUtil() {
            super();
        }

        public static <T> T getBean(String id, Class<T> clazz) {
            if (ctx == null) {
                throw new NullPointerException("ApplicationContext is null");
            }
            return (T) ctx.getBean(id);
        }

        @Override
        public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
            ctx = applicationContext;
        }
    }

    建议：删除Constructor，或者参考第33节

    建议：扔掉getBean函数，用：
    org.springframework.beans.factory.BeanFactory.getBean(String, Class<T>)
    BeanFactory 是ApplicationContext的父接口。

    建议：Spring搞的都是OO，我们用Spring也应该遵循OO。OO和静态的东东是相排斥的。
    把Spring的ctx做成静态的引用，会有多种缺陷。例如：
    （A）潜在的内存泄露。
    （B）清理对象的时候，总是不能清理static ctx，这是灾难性的错误。

    建议：getBean可能是作者的使用目的，是以static的方式访问的。
    可它的初始化，竟然是以实例的方式搞的！！！
    @Override
    public void setApplicationContext

    建议：经过上面4条建议，可以删除掉SpringBeanUtil这个可怜的类了。

41.

    public String resetPassword(String loginId, String resourceNo,
        Map<String,String> data) throws SystemException {
        String message = "";
        String userSymbol = CacheCommonUtil.getUserSymbol(loginId, resourceNo);
        User user = CacheLoadUtil.getUsers().get(userSymbol);
        SystemParam dPassword = systemDao.selectSystemParamByKey(SystemParamConstants.PARAM_PWD_GROUP,user.getResourceNo());

        try {
            if (dPassword==null||StringUtil.isEmpty(dPassword.getParamValue())) {//若无公司的默认密码，则默认为登录名
                user.setPassword(CoderUtils.toHex(CoderUtils.encryptMD5(user.getLoginId())));
            }else {
                user.setPassword(CoderUtils.toHex(CoderUtils.encryptMD5(dPassword.getParamValue())));
            }
            user.setUpdatedBy(data.get("loginId"));
            userDao.update(user);
            CacheLoadUtil.getUsers().put(userSymbol, user);
            // 增加操作日志
            SystemLogUtil.addSystemLog(data, FuncType.SYSTEM_SETTING,AclConstants.SYS_RESET_PASSWORD, "密码******", "密码******");
            message = "success";

    建议：第4行，凡是从缓存取数据的操作，应该建立个成员变量（member variable），
    用Spring的标准set方式注入cacheManager对象，坚决抛弃静态功能。

    建议：CoderUtils，词汇Coder明显意义错误。
    可以改成CodecUtils，标准依据：org.apache.commons.codec.*

    建议：加密用：org.apache.commons.codec.digest.DigestUtils .md5Hex(byte[] data)

    建议：倒数第3行，密码，不应该以明文方式出现在log里。

42.

    public class SystemServiceImpl implements ISystemService {
        private static final Logger LOGGER = LoggerFactory.getLogger(SystemServiceImpl.class);

    建议：实例范围的类，就用实例范围的Logger。
    private Logger LOGGER = LoggerFactory.getLogger(getClass());

43. 自动化测试，包含了哪几块？

    （A）自动化单元测试。专门测试某层级的某类。这是最细粒度的。
    （B）自动化集成测试。
        例如：某Web Service的TC，顺便也把它的下面几层（Service层、Dao层）都测试到了。
    （C）冒烟测试

44. 自动化测试，有哪些原则？

    这里，简称为TC（TestCase）。
    （A）TC_Y不会依赖于TC_X和TC_Z。
    （B）跑任何的TC，只用1条指令。注意：只是1条，不是2条或N条。
        这1条，里面包含了启动相关的资源（DB，Web Server……）
    （C）在developerA电脑里能跑的300个TC，移动到developerB电脑里的任何目录里，
        也要跑对。像”C:/MyTempDir”之类的absolute path，绝不应该出现。
    （D）不依赖于外部资源和网络。
        例如：用www.ip138.com得到本机的外网ip。如果那家网站垮了或被封了，就会影响TC。
        例如：利用了公司内网里某台DB和某些WebService。如果那些停了，就会影响TC。
        例如：源码里出现了多次192.168.1.xxx就是错误的。
        既然“不依赖于外部资源”了，那就更加不会依赖于“虚拟机”了。
        有网络的时候能跑对；拔掉网线的接头，也能跑对。
    （E）不应该弹出UI。
        如果必须要弹出UI才能检验正确性，也行，还必须在弹出后3秒再自动的关闭它。
        然后接着继续跑后面的TC。

45. TC需要的外部资源，如何模拟？

    （A）Mockito / EasyMock
        用于模拟：接口，抽象类，普通类（非final的）
        待续。
    （B）Embedded Tomcat
        用于模拟Web Site和Web Service。

        @BeforeClass
        public static void setUpClass() throws Exception {
            tomcat = new Tomcat();
            tomcat.setBaseDir(tomcat4junit);
            tomcat.addWebapp(new File("web").getCanonicalPath());
            tomcat.setPort(PORT);
            tomcat.start();
        }

        @AfterClass
        public static void tearDownClass() throws Exception {
            tomcat.stop();
            tomcat.destroy();
        }

    （C）DbUnit + Derby / HsqlDB / H2  instead of  MySql / Oracle / SqlServer
        经典用法：在每次TC之前（@Before里），清空table，并且导入某xml文件到table里：

        DatabaseOperation.CLEAN_INSERT.execute(dbConn2, dataSet2);

46.

    private String translateContract(String contract,Declare declare) throws Exception {
        Pattern pattern = Pattern.compile("[$]\\{[^}]*\\}");
        Matcher matcher = pattern.matcher(contract);
        StringBuffer sb = new StringBuffer();

        While( … )

    建议：
    为了避免硬编码，为了减少复杂性，尽量不要自己搞正则表达式。
    用org.springframework.beans.factory.config.PlaceholderConfigurerSupport的常量。
    final String[] arr = StringUtils.substringsBetween("abc${123}efg${678}www",
        DEFAULT_PLACEHOLDER_PREFIX, DEFAULT_PLACEHOLDER_SUFFIX);
    assertEquals("123", arr[0]);
    assertEquals("678", arr[1]);

    至于替换的功能，参考：spring  PropertyPlaceholderConfigurer

47.

    contract.setSerialno(UUID.randomUUID().toString().replaceAll("-", ""));

    建议：
    public String replaceAll(String regex, String replacement)
    性能差些，是针对正则表达式搞替换的，而不是针对普通String。
    这里，应该用
    public String replace(CharSequence target, CharSequence replacement)

48.

    if(type.equals(Workflow.TASK_CLAIM)){
        if(role.equals("S")){
            appStatus = "1";
        }else if(role.equals("M1")){
            dataStatus = "2";
            appStatus = "4";
        }else if(role.equals("M2")){
            dataStatus = "2";
            appStatus = "7";
        }else if(role.equals("P")){
            appStatus = "10";
        }else if(role.equals("PHK")){
            appStatus = "13";
        }else if(role.equals("PHTQR")){
            appStatus = "15";
        }else if(role.equals("PGZ")){
            appStatus = "17";
        }
    }else if(type.equals(Workflow.TASK_COMPLETE)){
        if(role.equals("S")){
            if(passValue){
                dataStatus = "2";
                appStatus = "3";
            }else{
                dataStatus = "0";
                appStatus = "0";
            }
        }else if(role.equals("M1")){
            if(passValue){
                dataStatus = "2";
                appStatus = "6";

    建议：
    （A）用Java7的switch( str )功能。
    （B）凡是常量，都应该以String[]/String[][]/enum的形式，做在Util里。
    （C）每个常量的意义，用本地语言（中文）尽量详细解释。例如：
    /**
     * 很常用的表示状态的标志位。
     * 只用一个byte/char表示状态，让解析更快。
     */
     public static final String OK = String.valueOf(1);

 49. 如何对程序打分（0--100）？

    （A）勉强跑起来的，能用的，通过测试组的检查。0—30
        中国的99+%的公司里的大部分程序员，做到了这条就停止了。
    （B）自动化审核通过的（PMD，FindBugs，CheckStyle……），符合常见模式的。0—10
        用自动化工具审核，然后修改。这条容易。
        JavaEE里，通用的东东多，我们大多数都只做增删改查，需要的模式很少。这条也容易。
    （C）主要的功能，被自动化测试覆盖了的。0--15
        例如：某项目有WebService层，Service层，Dao层。
        由于时间紧，仅仅只搞了WebService层的自动化测试，
        虽然不足，但基本上覆盖了主要的功能。这也行的。
    （D）95+%的代码行，被自动化测试覆盖了的。0—15
        听说，中国阿里系的软件项目，能达到这个程度。
    （E）工程总体代码行数，很少较少的。0--20
        这个需要很多年的细致的知识积累，软件行业里，很少有人能达到。
        例如：很多功能，在jdk/apache commons/spring里都有，我们简单的调用就行了。

51.

    try {
        newMAC = PosCryptor.getMAC(PosServerConfig.getKeyHost(),PosServerConfig.getKeyPost(),
            entNo, posNo, operNo,requestMsgTypeId, newBody);

        LOGGER.debug("newMAC:"+LoUtils.byte2HexStr(newMAC));
    }catch (UnknownHostException e){
        throw new PosRunTimeException("keyserver 连接异常!",e);
    }catch (IOException e){
        throw new PosRunTimeException("keyserver io异常!",e);
    }catch (Exception e){
        throw new PosRunTimeException("keyserver格式解析异常!",e);
    }

    建议：参考第19节。
    建议：org.apache.commons.codec.binary.Hex

52.

    @Service
    public class XxxServiceImpl implements XxxService {
        private static Object invokeGet(Object o, String fieldName) throws Exception {
            String[] fieldNames = fieldName.split("[.]");
            for (String fn : fieldNames) {
                o = o.getClass().getMethod(fn).invoke(o, new Object[0]);
            }
            return o;
        }

    建议：通用的static函数，尽量放在Util里，尽量减少XxService的长度。
    建议：分隔string，不应该用“.”，因为它在regex里有特殊意义。应该是逗号“,”。
    org.springframework.beans.propertyeditors.StringArrayPropertyEditor.
    DEFAULT_SEPARATOR就是“,”
    建议：这个函数的本身意义，就有很大毛病：
    （A）变量o被赋值多次，却被当成结果只返回一次。
    （B）变量o既作为输入参数，又作为输出参数。
    （C）变量o前后的意义都不同。
        输入时的意义是：“某个普通对象”，将要被调用。
        输出时的意义是：“某个普通对象”调用某method的结果。

53. 有人说：持续集成，只是编译打包就行了，不需要跑自动化测试。

    建议：参考第38节。

55.

    建议：在循环里搞删除，影响性能，应该使用sql批量删除，输入的参数为：”1,2,3”

    建议：return行，返回：1或0，这是C风格，不是Java风格。
        Java风格是：使用Exception：public void myDeleteFunction(String str) throws Exception

    建议：扔掉try-catch。参考第19节。

    建议：经过了以上3个和第19节的建议，这个函数只需要1行就行了：
        msgPrivateMapper.deleteXxx (ids);

56.

    建议：所有的能跑的东东，都应该写在单元测试（junit）里，而不是main里。

    建议：有大量的注释（//或/* … */），就是错误。
        要么删除；要么解开，改变成为一个个的单独的junit test method。
        那么，在持续构建里，就能总是能把那些功能跑到，总是能自我检查尽早检查。

    建议：main()最后1行，不需要显式调用System.exit(0)。

58.

    建议：把重用多次的’N’、’Y’做成常量。

59.

    建议：del、add、update，都是相同性质的事务，Spring默认的行为就够用了。
    所以，rollback-for和no-rollback-for这2项，可以删除。

60. 有人说：代码写到一坨了，没法搞单独的TestCase。

    那就说明：这个程序比较差，是紧耦合的。好的是：松散耦合。所以，要重构了。
    解耦的最好方式是：接口+组合。例如：
    public class MyBusiness {
        private  MyBusniess00  bn00;
        private  MyBusniess01  bn01;
        private  MyBusniess02  bn02;
        ……
        //  setter & getter
    }

    这也是Spring最常用的套路。
    附带提个常识：
    如果某程序有好的单元测试和覆盖率，那就肯定说明：它的结构是好的，松散耦合的。

61. 如何对Java程序做格式化？

    建议：这是个来自于Spring源码里的文件，用Eclipse导入：
    Preferences—>Java—>Code Style—>Formatter-->Import

62. 某项目有600个class，修改了2个，影响了些啥？

    如果有完善的单元测试，跑跑，很快就知道影响了些啥，就能快速修改，极大的增强信心。
    所以，如果你按照XP/TDD的核心思想（单元测试）做程序，将会越做越顺！

63. 源码里有192.168.1.xxx，如何评价？

    如果这个IP是自己的，下班就关机了……
    （A）那么，夜间Jenkins服务器跑CI（持续构建）/每日构建（Daily Build），肯定失败。
    （B）别人从SVN拉下来项目，跑，也肯定失败。
    所以，这个IP绝不应该是自己的。

65. 如何查找性能瓶颈？

    DeveloperA负责项目P，最核心的功能B，性能总数字是100个/12秒。
    里面有这些东东：通讯协议解析C，业务D，业务E，业务F
    请他把这4项的耗时的具体数字和TestCase拿出来，他没有。
    请他把业务全部扔掉，只把C的耗时的具体数字和TestCase拿出来，他没有。

    建议：较好的查找性能瓶颈的路线：
    （A）设定个固定次数，例如：600，还可以设置大些，后面会多次用到这个。
        设定基线，即：assert(…); 每次跑完，必须要能看见绿条（Green Bar）作为结果。
    （B）单独把核心的功能B跑600次。
    （C）单独把C/D/E/F分别跑600次。
    （D）看看C/D/E/F里，谁耗时最多，就最先优化谁。每修改一次，就重新跑一趟。
        搞好了这项，往往达到70%的效果。
    （E）再优化耗时第2多的。搞好了这项，又增加了20%的效果。
        优化某项，里面又有多个组件R/S/T，如何分辨性能瓶颈？

    建议：重复之前的路线，针对R/S/T都建立TestCase……各个击破。

67. 跟性能最密切的程序段，可能是些啥？

    WebApp里的Filter、Inteceptor，普通App的协议的解析和反解析……
    是每次必须经过的路线。
    针对这些，必须有专门的TestCase，反复跑，反复优化。

69.

    建议：HashMap是有关算法的，肯定要内建hash表和计算hash。
    如果key是纯粹的数字，而且很小，那就直接做成数组/List，数组的index就是key。
    数组是直接存取，不需要计算hash，更快。

    建议：既然用了Spring，就有了BeanFactory，那就用它建立Singleton，不要自己手写getInstance()了。例如：
    <bean id="dataSources" class="org.springframework.beans.factory.config.ListFactoryBean">
        <property name="targetListClass">
            <value>java.util.ArrayList</value>
        </property>
        <property name="sourceList">
            <list>
                <ref bean="dataSource_0" />
                <ref bean="dataSource_1" />

    有人说：“做到spring里面去，效果是一样，还是这样好使用”
    建议：列几项软件原则：
    （A）“不做code，少做code。”  “代码行数越少越好。”
    （B）朝着稳定的方向依赖。
        完成同一个功能，是用Spring框架搞得稳定呢？还是用自己写的code搞得稳定呢？

70.

    Map<Integer,String> messageBody = new LinkedHashMap<Integer,String>();
    messageBody.put(3,termTradeCode);
    messageBody.put(42,entNoAsc);
    messageBody.put(62, "0012"+versionsAsc);

    建议：
    LinkedHashMap有复杂的算法，尽量回避。
    给Map显式的分配空间，尽量大些，这里分配256就足够了。
    List<Pair<K, V>>，只是简单的顺序的存取，很实用。参考第29节和上节。
    或者，用数组，更快。

71. 有人说：我做的程序，无法测试性能。还有人说：我做的这个框架，必须带些业务才能测试性能，无法单独测试纯粹的性能。

    建议：
    （A） 所有程序都能测试出来性能。如果无法测试出来，或者测试出的数字差，说明：
        这个程序或者测试程序有毛病，需要改善。
    （B） 业务是业务，框架是框架，它们之间应该是弱耦合的，针对接口编程的，能替换其它实现类的。它们都是能单独测试的，还能用上针对接口的Mock的东东。

72.

    这个极品工程里，只有几个class，每个class还占了一个package。
    建议：
    （A） 不要瞎成立maven工程。
        对于不确定是否需要独立的工程，先都放在一个里，便于修改。
        这个cache-api工程，可以合并到common工程里。如果code太烂，干脆就废除掉。
    （B） 静态方法调用要回避，应该做成实例形式，便于搞Object的模拟和测试。

75.

    建议：
    （A）权威的证明资料：《J2EE Development without EJB》
        我们自建的MyException，都应该extends RuntimeException，而非checked Exception。
    （B）重复的、临时的、不伦不类的、命名意义模糊的、小范围使用的class，赶快删除吧。

76.

    建议：PowerDesigner等工具生成的code，也要用眼睛看3遍。明显臃肿的，要删除。

77.

    建议：
    （A）用void代替boolean。如果出毛病了失败了，就抛出RuntimeException。
    （B）从try开始的几行，只保留Ecms所在的一行就够了。
    （C）带有@Test 的method，都应该声明throws Exception，为了里面尽量少写try-catch。

78.

    建议：
    （A） else-if，要有else { throw new RuntimeException(…) }
    （B） Java7，switch( string )

79.

    建议：用标准的JavaDoc方式，这还能避免某些源码覆盖率工具的解析错误。

80.

    后面request在cache里的值，精确的覆盖了前面request在cache里的值。

81.

    建议1：request应该是个傻傻的的简单的数据容器，里面怎么有个ServerMainHandler？
        ServerMainHandler调用request，是正常的，还能反过来调用，就是错误。

    建议2：handlerExecute(...)明显是搞业务的，里面怎么会放个Spring单态类？
        应该通过set/get的方式注入Spring单态类才对，不用每次在参数里传入。

82.

    aWeb项目的有多个spring的xml配置，可能跟b.jar、c.jar里的发生重名冲突。
    如今，公司测试环境OS上多个app，配置都统一在一个目录里，配置文件更加容易冲突。
    建议：配置文件应该统一命名为projectName_config.xml，projectName_config.properties
    不应该有applicationContext*.xml这种文件名字了。

83.

    建议：把package级的javadoc写在.java里，jdk和开源软件都走这种标准路线了。

84.

    建议：继承，只是OO的特性，跟常量（Constants）没有关系。
        应该杜绝常量类的继承。还应该杜绝常量接口。

85.

    建议：
    org.apache.commons.lang3.StringUtils
    public static boolean isNotBlank(CharSequence cs)
    public static boolean isNotEmpty(CharSequence cs)

86.

    建议：common有太多的小模块了，全部加起来也只430KB。
    这会浪费dev很多的编译和查错时间。
    应该合并为1个模块。

87.

    建议：
    （A）最明显的是57行—65行，连续出现3次相同的code。应该重新整理if-else。
    （B）36行，看看spring源码，initFilterBean()里面是空的。说明：此类不需要spring。
        原则：性能要紧之处（例如：Filter），继承层级越少越好，设置为final也好。
        所以，这里可以扔掉spring的父类，实现最基本的Filter接口就行了。

    （C）42行，用str.contains(…)
    （D）多个if-else，就必须要有足够的自动化TC覆盖到每个分支，否则，会出多个bug。
    （E）Filter的参数，也应该来自于spring工厂。参考第96节。

88.

    疯狂的if-else，这来自于Apache Continuum，是个反OO的典型范例。
    前人蹉跌，后人知警。

89.

    建议 1：第1行，返回的数据容器，应该是个普通的List/Map，怎么是JSONArray？
        List/Map是性能最高的，JSONArray性能肯定偏低。
        JSONArray是个偏重的容器，包含了List，还有些跟数据容器没有关系的东东。
        对于网络传输和解析，这些都是缺陷。

    建议 2：map的value，被前面的for循环多次赋值，实际却只用了最后的一次赋值！！！
        而且，Map的Key顺序是不确定的，最后得到的value，也是不确定的！！！

    建议 3：高亮的行，JSONArray.parseArray(…);
        参数里应该是普通String才对，实际却是jsonArray.toString()！！！
        倒腾几番，参数jsonArray完全没有排上用途，结果还是个String。
        那干脆做成Map<String, Integer>就更简单了。

    建议 4：网络传输，格式可能是json/xml/自定义string/binary/……。
        在发送端和接收端，解析出来的都应该是基本的Pojo/Model。
        如果用Pojo/Model，修改了传输信息格式，jsonàbinary，不会修改传输类（DTO）。
        它转换到各种格式，是最容易的，也是最开放的。
        如果用JSONArray，jsonàbinary，将会修改大量的传输类（DTO）。

    建议 5：原则：朝着稳定的方向依赖。
        是List/Map稳定呢？还是开源的（可能近几年没人管理或移交给他人的）fastjson稳定呢？

    建议 6：避免用Map，避免hash计算，多用List。
        就算用Map是对的，Map的key也应该是Integer、String、Class等，绝不是JSONArray。

    建议 7：从原意看来，Map里只有一个元素（Entry），key是list，value是int。
        既然信息只有两样，不用Map，恰好可以用apache-commons Pair<List, Integer>。

    建议 8：从原意看来，如果要携带更多信息，可以自定义class来搞。

    建议 9：综上所述，Server端Client端都做得很奇葩。
        以后dev再遇到这种code，应该立即提出来。
        越早暴露就越好，bug越少，性能越高，今后修改越少，越节省公司的成本。

    建议 10： 在内网里，ServerA从ServerB取得比较稳定的数据，可以把吞吐量搞大些。例如：
        多数情况，总共都只有几百条，那就每次取2000条数据缓存于ServerA的session里。
        避免每次取10条取多次而增加request次数。

90.

    建议 1：成员变量Random被多线程访问，会出错。

    建议 2：验证码，应该避免长得像的字符：
    （A）数字1、L的小写和i的大写。
    （B）数字0和字母o大写。
    （C）数字2和字母z。

    建议 3：成员变量都应该显式声明为final，扔掉private。

91.

    建议：这种情况，“可读性”比“性能和硬编码”更重要。
    String.format(“12%s45%s”, 3, 6);

92.

    建议：常用的英文词汇，搞简写就行了。
    transactionàtx
    account-->acc
    currency-->ccy
    level-->lv
    message-->msg
    amount-->amt
    command-->cmd
    buffer-->buf
    receive-->rcv
    service-->svc

93. 跑·不跑

    今天是2014/12/31，这几个的最后更新日期，竟然是146天之前！！！
    建议：测试类，肯定是经常增加内容的。例如：
    （A）测试组报了bug，dev就应该增加几个TC（TestCase）了。
    （B）有了新需求，应该增加几个TC了。
    （C）程序的某段，也许有更好的更快的做法，要做个试验吗？增加TC了。
    （D）dev估计到某块可能出毛病，那么今后肯定会出毛病。增加TC了。
    （E）需要几个性能测试？增加TC了。
        程序，就是用来跑的，必须经常的跑，才能检查出健康状况。
        持续构建，把工程里几万行code跑几遍几十遍，就是经常的“跑”。
        本图，就是典型的“不跑”。

94. 外部配置·main程序（jar）

    在spring xml里配置相对的.properties文件路径：
    <context:property-placeholder location="file:../../hsserv/config/pos.properties" />
    这样做的好处是：
    （A）只要把同一套配置编辑好了，今后发布N次jar，都不需要修改配置了，
        减少了修改次数，这条会让测试人员和部署人员轻松很多。
    （B）配置文件放在专门的目录里，设置权限，
        只让有权限的人员操作，禁止他人的读写，安全。
    （C）在一个OS实例里，appA、appB、appC能共用相同的配置。
    （D）相对路径总是优于绝对路径。
    （E）不需要设置OS级别的系统变量classpath，不需要设置tomcat的classpath。

    打包的指令：mvn -DskipTests install -P deploy
    在point1-0.0.1-SNAPSHOT.jar/META-INF/ MANIFEST.MF里，有两个attribute：
    Class-Path: . config/ ../
    Main-Class: com.gy.pos.Main
    这表明：，classpath包括了：
    当前路径，当前的config里的路径，上一级路径。
    有些.xml要单独的拷贝出来，避免出现重复的配置，这用到了maven-resources-plugin。
    它们必须在classpath里，而且必须在jar外面，而且还能被别的app共用。
    完整的配置：
    运行程序的指令：java -jar point1-0.0.1-SNAPSHOT.jar
    path就是jar所在的目录
    如果.xml还要被webapp（.war）共用，这么设置：
    <Class-Path>. /opt/xml_conf/ /opt/lib/a.jar</Class-Path>
    注意：它们之间的分隔符是空格，不是“;”或“:”
    ecms_config.xml等放在/opt/xml_conf/里，就能被找到了。

95. 外部配置·web程序（war）

    如果maven web项目的某子模块用了这个配置，在pom.xml里屏蔽掉。
    在打war包的时候，子模块的jar就 不会 有这个文件了。
    然后，在dist或aggregator子模块里修改spring配置：
    <context:property-placeholder location="file:../../hsserv/config/posweb_config.properties" />
    或者：
    <context:property-placeholder location="classpath:posweb_config.properties" />
    这是最好的方案，保持spring的xml配置在多种环境dev/test/uat/prod都保持一致。
    当然，需要先在OS级别设置系统变量：
    CLASSPATH=.:/opt/xml_conf:../config
    export CLASSPATH

    注意：它们之间的分隔符是“:”，不是空格。
    注意：这是全局性的，如果OS跑几个app，它们的类路径有同名的配置文件，可能会冲突。
    最典型的例子：common-log-0.0.1.jar里有log4j.xml，会覆盖pos-server.jar的log4j.xml。
    所以，pom.xml的打包功能，要排除掉这些文件。另外，也只能用人工来提防这个了。
    有些是无法用classpath的，例如：log4j.xml里设置log文件，那就只能用文件路径了：
    <param name="File" value="/opt/hsserv/log/myProj/debug.log" />
    事实上，这个值跟classpath也是完全没有关系的。

96. 外部配置·把spring的配置值传递给Filter

    首先，确认几样东东的执行顺序：
    （1）ContextListener（标准ServletContextListener、Spring ContextLoaderListener）
    （2）Filter
    （3）Servlet
    所以，在Filter之前，Spring的ctx就已经组装好。
    Filter做init()的时候，就能拿到Spring的配置值（myProperties）了。
    <util:properties id="my_config" location="classpath:my_config.properties" />
    以上2行都是spring的标准api。

    通用的Util.getConfigBean()还能在 任何时候任何地点 使用，这就足够灵活了。

97. 外部配置·一种配置有3套配置值

    怎么会有3套配置值？后面还能覆盖前面的值？像“传染病”有了传递关系？
    对于长期的维护，保持唯一性，很重要。
    对于长期的维护，配置文件，越少越好。
    再例如：
    *-config.properties里有个开关runMock=on
    *-config-test.properties里没有设置这个开关
    *-config-prod.properties里没有（忘记了）设置这个开关
    那么，在prod环境，用的就是开发环境的on！实际上我们需要的是off！
    所以，建议删除此xml的*-test.properties、*-prod.properties。

98. 外部配置·自定义的扩展类

    目前，多个app用的是公司common里的：GyPropertyPlaceholderConfigurer，
    作用：把多个.properties内容合并为一个大的，能取得配置值。
    （A）这样搞，配置值会冲突。
        曾经有人说：“制定一个命名方式比较好，比如用子系统标识做前缀”。
        其实，“在每个配置文件里面，做监督检查”是很难的。
        如同公司规定“禁止全体员工吃牛肉”，很难实现和监督。

    （B）config.properties、notice-config.properties、acl-config.properties等等，
        本来都是独立的，就不应该在此class里合并。

99. 外部配置·多个配置文件·推荐的路线

    优点：
    1 不需要自己创建class、interface跟Spring做整合。符合大原则：Don’t Write Code。
    2 每个配置文件都保持了独立性，都能用Spring getBean()方式得到。
        Properties  posConf  = ctx.getBean("pos_PosConf", Properties.class);
        里面的Key Value的命名也是最宽松的，随便倒腾都行，不会影响别的.properties。
    3 多个配置之间，永远不会有覆盖的事情。

100. 外部配置·全局配置·局部配置

    如果公共classpath里已经有了some_config.properties，
    但我的app不用那个，只用自己专有的some_config.properties，怎么办？
    很简单，把some_config换个新名字some_config_for_myproj。
    各种局部配置都可以这么做。

### 参考
* [Code Review最佳实践](http://jimhuang.cn/?p=59)

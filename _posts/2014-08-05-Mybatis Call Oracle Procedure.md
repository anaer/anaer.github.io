---
layout: post
title: "Mybatis调用Oracle的存储过程"
description: ""
category: Mybatis
tags: [Mybatis, Oracle]
---

``` java
package com.dao;

import java.util.HashMap;

public interface CounterMapper {
    void getSerialNo(HashMap<String, Object> map);

    String getOraDateStamp();

    String getCurDate();

    String getCurrentSerialNo(Long counterNo);

    void reSetSerialNo(HashMap<String, Object> map);
}
```

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.dao.CounterMapper" >
	<parameterMap id="paramMap"  type="java.util.Map">
       <parameter property="result" javaType="java.lang.Long" jdbcType="NUMERIC" mode="OUT"/>
       <parameter property="initDate" javaType="java.lang.Long" jdbcType="NUMERIC" mode="IN"/>
       <parameter property="counterNo" javaType="java.lang.Long" jdbcType="NUMERIC" mode="IN"/>
       <parameter property="serialNo" javaType="java.lang.String" jdbcType="VARCHAR" mode="OUT" />
       <parameter property="serialNumber" javaType="java.lang.Long" jdbcType="NUMERIC" mode="OUT"/>
       <parameter property="errorNo" javaType="java.lang.Long" jdbcType="NUMERIC" mode="OUT"/>
       <parameter property="errorInfo" javaType="java.lang.String" jdbcType="VARCHAR" mode="OUT"/>
       <parameter property="errorId" javaType="java.lang.Long" jdbcType="NUMERIC" mode="OUT"/>
       <parameter property="errorSysInfo" javaType="java.lang.String" jdbcType="VARCHAR" mode="OUT"/>
    </parameterMap>
 	<update  id="getSerialNo" parameterMap="paramMap" statementType="CALLABLE"  >
       {? = call f_sn_get(?,?,?,?,?,?,?,?) }
    </update > 
	
	<select id="getOraDateStamp" resultType="String">
			select to_char(current_timestamp,'yyyy-mm-dd hh24:mi:ss.ff3') from dual
	</select>
	
	<select id="getCurDate" resultType="String">
			select to_char(current_timestamp,'yyyymmdd') from dual
	</select>
	
	<select id="getCurrentSerialNo" resultType="String">
		SELECT COUNTER_VALUE
		  FROM SN_COUNTER
		 WHERE COUNTER_NO = #counterNo#
	</select>
	
	<update id="reSetSerialNo" parameterMap="paramMap">
		UPDATE SN_COUNTER
		   SET COUNTER_VALUE = 0
		 WHERE COUNTER_NO = #counterNo#
	</update>
</mapper>
```
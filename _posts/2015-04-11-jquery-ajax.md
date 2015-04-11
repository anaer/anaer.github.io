---
layout: post
title: "jQuery ajax学习"
file: 2014-08-14-jquery.md
update: 2015-01-24 20:50
tags: [jQuery]
---

#### ajax jsonp跨域访问

    $.ajax({
        type : "get",
        async:false,
        url : "http://app.example.com/base/json.do?sid=1494&busiId=101",
        dataType : "jsonp",//数据类型为jsonp
        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        success : function(data){
            $("#showcontent").text("Result:"+data.result)
        },
        error:function(){
            alert('fail');
        }
    });


    @RequestMapping("/base/json.do")
    public void exchangeJson(HttpServletRequest request,HttpServletResponse response) {
       try {
        response.setContentType("text/plain");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        Map<String,String> map = new HashMap<String,String>();
        map.put("result", "content");
        PrintWriter out = response.getWriter();
        JSONObject resultJSON = JSONObject.fromObject(map); //根据需要拼装json
        String jsonpCallback = request.getParameter("jsonpCallback");//客户端请求参数
        out.println(jsonpCallback+"("+resultJSON.toString(1,1)+")");//返回jsonp格式数据
        out.flush();
        out.close();
      } catch (IOException e) {
       e.printStackTrace();
      }
    }

### 参考
    * [5种处理js跨域问题方法汇总](http://www.w2bc.com/Article/11974)
    * [ JQuery+ajax+jsonp 跨域访问 ](http://hanqunfeng.iteye.com/blog/1866712)
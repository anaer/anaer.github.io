Java	String 占位符	"String stringFormat  = ""lexical error at position %s, encountered %s, expected %s "";   
  
String messageFormat =""lexical error at position {0}, encountered {1}, expected {2}"";   
  
System.out.println(String.format(stringFormat, 123, 100, 456));   
  
System.out.println(MessageFormat.format(messageFormat, new Date(), 100, 456));  
   2种方式 主要是占位符不一样，好看下结果是

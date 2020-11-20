/*
http的缺点
  1.使用明文通信，传输内容容易被窃听
  2.不验证通信方的身份，容易被伪造请求
  3.无法保证请求报文的完整性，容易被篡改报文
* */

/*
  https是在http的基础上使用SSL(Secure Socket Layer)和TLS(Transport Layer Security)
协议来实现的

  应用(HTTP)    应用(HTTP)
  TCP           SSL || TLS
  IP            TCP
                IP
* */

/*
对称加密：使用同一个秘钥加密解密，秘钥一旦泄露就完蛋
非对称加密：公钥加密，私钥解密--公钥可直接传输，保存好私钥就安全
* */
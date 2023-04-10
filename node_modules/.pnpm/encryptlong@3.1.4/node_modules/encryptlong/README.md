# encryptlong

# 原版官方网站

http://travistidwell.com/jsencrypt

# 介绍

基于 jsencrypt 扩展长文本分段加解密功能

npm 安装：

```bash
npm i encryptlong -S
```

浏览器使用：

```html
<script src="./bin/jsencrypt.js"></script>
```

# 基本使用

> 注意：使用长文本加密时最好公私钥都要设置，避免有概率加密失败

这里只扩展了长文本的分段加解密，其它 api 请查看官网 http://travistidwell.com/jsencrypt

-   `encryptLong()` 长文本加密
-   `decryptLong()` 长文本解密

```js
let startTime = new Date();
//公钥
const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKX1Fs2JUD25zrAEwPnjnZC0az
rl1XjGzGrJ64eb1lr9QVVOO2zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZb
UrqUziHE5YGC02wObiZEzfa6V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMz
etn7mcCeLw8/vmxz3QIDAQAB
-----END PUBLIC KEY-----`;
//私钥
const PRIVATE_KEY = `
-----BEGIN PUBLIC KEY-----
MIICXgIBAAKBgQDKX1Fs2JUD25zrAEwPnjnZC0azrl1XjGzGrJ64eb1lr9QVVOO2
zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZbUrqUziHE5YGC02wObiZEzfa6
V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMzetn7mcCeLw8/vmxz3QIDAQAB
AoGBAJBr6b4V6nJwXdHPyngy4PGl/HTqcK60BkTamALqzmEtU9tNU5z2yz7dy+6a
wTsjo7Vao8CwNrUp5fHGXw65EEc1/3Iu2Fiix0XF7RP4NFSoxbBmzQW1nUK/5DFi
4VR1uhEmdbgLwGabsdqzeUqhRKkRGAPVCotBjaDBOu0J3Mu5AkEA+SM7Ctu7evOv
ZwjWrp9a5MGxJ9yLLabbIuWL+420jr2G6ojaTZ2ROA2DWWQPx4JqWxDHttomrb38
dk2emP2WAwJBAM/yU58YRQ+dTeuTzNYC1JdWcs35n9+hoVP7y+x29CmcqDTPp3nR
Bbbq88yMb2nZdlwthWi7BurNHsRJFqj0GJ8CQF5gJCuW1UxcJ2PGi1yW7R2e6fcJ
qoden8B2aDKgmXdBAGyz7s5cE/jB1bH1H60aECPzFVSFCwXh5FMEUEHwPfUCQQC7
JqZ57lbhebrSRcA58GwzFFvY40wu8gIHWvwqgti2xsZgWW+qZCPXf9gSBWaUhmJP
Da0fGAxesGN7VyhswNuTAkEAzCFNqL/zwHXcwh9YyHTdk/bRWIJq49jTA+vbgGv0
szKIvGRKoRbub3NEUiI80TDsCAvbJ6R80J7RjnpmShOwcA==
-----END PUBLIC KEY-----`;

// 使用设置公私钥
const enc = new JSEncrypt();
enc.setPublicKey(PUBLIC_KEY);
enc.setPublicKey(PRIVATE_KEY);

// 一段长文本json
let data = {
    code: 200,
    result: {
        timestamp: 1572321851823,
        inter1: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        inter2: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        inter3: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        inter4: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        inter5: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        inter6: ["123123123", "123123123", "123123123", "123123123", "123123123"],
        stream: {},
        caton: {},
        card: []
    }
};
data = JSON.stringify(data);
let encrypted = enc.encryptLong(data);
let endTime = new Date();
console.log("加密后数据:%o", encrypted);
console.log("加密时间" + (endTime - startTime) + "ms");
//使用私钥解密
let uncrypted = enc.decryptLong(encrypted);
console.log("解密后数据:%o", uncrypted);
```

# 其它使用

这个库应该与 openssl 一起使用

-   在终端（基于 Unix 的操作系统）

```bash
openssl genrsa -out rsa_1024_priv.pem 1024
```

-   会生成一个私钥，您可以通过执行以下操作查看

```bash
cat rsa_1024_priv.pem
```

-   然后，您可以将其复制到 index.html 内的私钥处
-   接下来，您可以通过执行以下命令来获取公钥

```bash
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```

-   查看公钥

```bash
cat rsa_1024_pub.pem
```

-   将其复制到 index.html 中的 Public 键中
-   现在，您可以通过在代码中执行以下操作来转换加密解密文本转换

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>使用jsencrypt执行长文本加密，解密</title>
    </head>

    <body>
        <div>长文本加解密</div>
    </body>
    <script src="./jquery.js"></script>
    <script src="./bin/jsencrypt.js"></script>
    <script type="text/javascript">
        let startTime = new Date();
        //公钥
        const PUBLIC_KEY = `
        -----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKX1Fs2JUD25zrAEwPnjnZC0az
        rl1XjGzGrJ64eb1lr9QVVOO2zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZb
        UrqUziHE5YGC02wObiZEzfa6V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMz
        etn7mcCeLw8/vmxz3QIDAQAB
        -----END PUBLIC KEY-----`;
        //私钥
        const PRIVATE_KEY = `
        -----BEGIN PUBLIC KEY-----
        MIICXgIBAAKBgQDKX1Fs2JUD25zrAEwPnjnZC0azrl1XjGzGrJ64eb1lr9QVVOO2
        zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZbUrqUziHE5YGC02wObiZEzfa6
        V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMzetn7mcCeLw8/vmxz3QIDAQAB
        AoGBAJBr6b4V6nJwXdHPyngy4PGl/HTqcK60BkTamALqzmEtU9tNU5z2yz7dy+6a
        wTsjo7Vao8CwNrUp5fHGXw65EEc1/3Iu2Fiix0XF7RP4NFSoxbBmzQW1nUK/5DFi
        4VR1uhEmdbgLwGabsdqzeUqhRKkRGAPVCotBjaDBOu0J3Mu5AkEA+SM7Ctu7evOv
        ZwjWrp9a5MGxJ9yLLabbIuWL+420jr2G6ojaTZ2ROA2DWWQPx4JqWxDHttomrb38
        dk2emP2WAwJBAM/yU58YRQ+dTeuTzNYC1JdWcs35n9+hoVP7y+x29CmcqDTPp3nR
        Bbbq88yMb2nZdlwthWi7BurNHsRJFqj0GJ8CQF5gJCuW1UxcJ2PGi1yW7R2e6fcJ
        qoden8B2aDKgmXdBAGyz7s5cE/jB1bH1H60aECPzFVSFCwXh5FMEUEHwPfUCQQC7
        JqZ57lbhebrSRcA58GwzFFvY40wu8gIHWvwqgti2xsZgWW+qZCPXf9gSBWaUhmJP
        Da0fGAxesGN7VyhswNuTAkEAzCFNqL/zwHXcwh9YyHTdk/bRWIJq49jTA+vbgGv0
        szKIvGRKoRbub3NEUiI80TDsCAvbJ6R80J7RjnpmShOwcA==
        -----END PUBLIC KEY-----`;

        // 使用设置公私钥
        const enc = new JSEncrypt();
        enc.setPublicKey(PUBLIC_KEY);
        enc.setPublicKey(PRIVATE_KEY);

        // 一段长文本json
        let data = {
            code: 200,
            result: {
                timestamp: 1572321851823,
                inter1: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                inter2: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                inter3: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                inter4: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                inter5: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                inter6: ["123123123", "123123123", "123123123", "123123123", "123123123"],
                stream: {},
                caton: {},
                card: []
            }
        };
        data = JSON.stringify(data);
        let encrypted = enc.encryptLong(data);
        let endTime = new Date();
        console.log("加密后数据:%o", encrypted);
        console.log("加密时间" + (endTime - startTime) + "ms");
        //使用私钥解密
        let uncrypted = enc.decryptLong(encrypted);
        console.log("解密后数据:%o", uncrypted);
    </script>
</html>
```

-   您必须提供哈希函数。在本例中，我们使用的是[CryptoJS](<[CryptoJS](https://github.com/brix/crypto-js)>)库
-   此外，除非使用自定义散列函数，否则应该为`sign`方法提供散列类型。可能的值有：`md2`, `md5`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512`, `ripemd160`.

# 其它信息

## Base64 格式的 1024 位 RSA 私钥

```txt
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDHikastc8+I81zCg/qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvs
kYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk
7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffBBy0IGO0zc128IshYcwIDAQAB
AoGBALTNl2JxTvq4SDW/3VH0fZkQXWH1MM10oeMbB2qO5beWb11FGaOO77nGKfWc
bYgfp5Ogrql4yhBvLAXnxH8bcqqwORtFhlyV68U1y4R+8WxDNh0aevxH8hRS/1X5
031DJm1JlU0E+vStiktN0tC3ebH5hE+1OxbIHSZ+WOWLYX7JAkEA5uigRgKp8ScG
auUijvdOLZIhHWq7y5Wz+nOHUuDw8P7wOTKU34QJAoWEe771p9Pf/GTA/kr0BQnP
QvWUDxGzJwJBAN05C6krwPeryFKrKtjOGJIniIoY72wRnoNcdEEs3HDRhf48YWFo
riRbZylzzzNFy/gmzT6XJQTfktGqq+FZD9UCQGIJaGrxHJgfmpDuAhMzGsUsYtTr
iRox0D1Iqa7dhE693t5aBG010OF6MLqdZA1CXrn5SRtuVVaCSLZEL/2J5UcCQQDA
d3MXucNnN4NPuS/L9HMYJWD7lPoosaORcgyK77bSSNgk+u9WSjbH1uYIAIPSffUZ
bti+jc1dUg5wb+aeZlgJAkEAurrpmpqj5vg087ZngKfFGR5rozDiTsK5DceTV97K
a3Y+Nzl+XWTxDBWk4YPh2ZlKv402hZEfWBYxUDn5ZkH/bw==
-----END RSA PRIVATE KEY-----
```

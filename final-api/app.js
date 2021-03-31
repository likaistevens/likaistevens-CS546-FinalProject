const express = require('express');
const app = express();
const configRoutes = require('./routes');
const path = require('path')


// 1. 需要将允许跨域的请求代码放在所有的路由前面，因为请求被express接受到的时候，拦截的顺序是根据自己写的代码路由顺序决定的，一旦满足拦截条件，如果不执行next()方法，则就不会继续把请求发送给下一个路由拦截器。
// 2. res.header("Access-Control-Allow-Origin", req.headers.origin); 不能使用 *， 否则协议不通过
app.all('*', function(req, res, next) {
  // console.log(req.headers.origin)
  // console.log(req.environ)
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use(express.json());

// 此处静态资源的引用必须在应用路由之前
app.use(express.static(path.join(__dirname, 'public')))

configRoutes(app);


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

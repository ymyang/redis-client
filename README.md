# redis-client
node redis client

# 安装

```
npm install redis.js
```

# 使用

```javascript

var RedisClient = RedisClient('redis.js');

var client = new RedisClient('127.0.0.1', 6379);


 // 缓存字符串，expire为有效期（秒，可选）
client.set(key, value, expire).then(function(data) {
    console.log('set ok');
}).catch(function(err) {
    console.error(err);    
});

// 取字符串值
client.get(key).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.error(err);    
});

// 删除缓存
client.delete(key).then(function(data) {
    console.log('delete ok');
}).catch(function(err) {
    console.error(err);    
});

// 缓存对象，expire为有效期（秒，可选）
client.hmset(key, value, expire).then(function(data) {
    console.log('hmset ok');
}).catch(function(err) {
    console.error(err);    
});

// 取缓存对象
client.hgetall(key).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.error(err);    
});


```


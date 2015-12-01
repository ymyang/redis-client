# redis-client
node redis client

# 安装

```
npm install redis.js
```

# 使用

```
var RedisClient = RedisClient('redis.js');

var client = new RedisClient('127.0.0.1', 6379);

 
client.set(key, value, expire);

client.get(key).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.error(err);    
});

client.delete(key);

client.hmset(key, value, expire);

client.hgetall(key).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.error(err);    
});

```


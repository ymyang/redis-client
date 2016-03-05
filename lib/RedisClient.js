/**
 * Created by yang on 2015/7/4.
 */
var redis = require('redis');
var Promise = require('bluebird');

module.exports = RedisClient;

const DEFAULT_EXPIRE = 24*60*60;

function RedisClient(host, port) {
    host = host || '127.0.0.1';
    port = port || 6379;

    var client = redis.createClient(port, host);
    this._client = client;
}

RedisClient.prototype.flushAll = function() {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.send_command("flushall", [], function(err, r){
            if (err) {
                reject(err);
            }
            resolve(r);
        });
    });
};

/**
 * 删除缓存
 * @param key
 */
RedisClient.prototype.delete = function(key) {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.del(key, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

/**
 * 缓存字符串
 * @param key
 * @param value
 * @param expire 有效时间，单位：秒
 */
RedisClient.prototype.set = function(key, value, expire) {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.set(key, value, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    }).then(function() {
        return _that.expire(key, expire);
    });
};

/**
 * 取缓存的字符串
 * @param key
 * @returns {Promise}
 */
RedisClient.prototype.get = function(key) {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.get(key, function(err, reply) {
            if (err) {
                reject(err);
            }
            resolve(reply);
        });
    });
};

/**
 * 缓存对象
 * @param key
 * @param obj
 * @param expire 有效时间，单位：秒
 */
RedisClient.prototype.hmset = function(key, obj, expire) {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.hmset(key, obj, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    }).then(function() {
        return _that.expire(key, expire);
    });
};

/**
 * 取缓存的对象
 * @param key
 * @returns {Promise}
 */
RedisClient.prototype.hgetall = function(key) {
    var _that = this;
    return new Promise(function(resolve, reject) {
        _that._client.hgetall(key, function(err, reply) {
            if (err) {
                reject(err);
            }
            try {
                for (var p in reply) {
                    if (reply[p] == 'null') {
                        reply[p] = null;
                    } else if (reply[p] == 'undefined') {
                        reply[p] = undefined;
                    }
                }
            } catch(e) {
            }
            resolve(reply);
        });
    });
};

/**
 * 设置缓存失效时间
 * @param key
 * @param expire
 */
RedisClient.prototype.expire = function(key, expire) {
    this._client.expire(key, expire);
    return new Promise(function(resolve, reject) {
        expire = expire || DEFAULT_EXPIRE;
        _that._client.expire(key, expire, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};
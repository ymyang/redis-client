/**
 * Created by yang on 2015/11/23.
 */
var RedisClient = require('../index.js');

describe('RedisClient', function() {
    it('set', function(done) {
        var client = new RedisClient('192.168.1.120', 6379);
        client.set('test-set', 'test set value').then(function() {
            done();
        }).catch(done);
    });
    it('get', function(done) {
        this.timeout(0);
        var client = new RedisClient('192.168.1.120', 6379);
        client.get('test-hmset').then(function(data) {
            console.log(data);
            done();
        }).catch(done);
    });
    it('delete', function(done) {
        var client = new RedisClient('192.168.1.120', 6379);
        client.delete('test-hmset').then(function() {
            done();
        }).catch(done);
    });
    it('hmset', function(done) {
        var obj = {key1: 'value test', key2: 345};
        var key = 'test-key2';
        var client = new RedisClient('192.168.1.120', 6379);
        client.hmset(key, obj).then(function() {
            done();
        }).catch(done);
    });
    it.only('hmget', function(done) {
        this.timeout(0);
        var key = 'test-key2';
        var client = new RedisClient('192.168.1.120', 6379);
        client.hmget(key).then(function(data) {
            console.log(data);
            done();
        }).catch(done);
    });
});
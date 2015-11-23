/**
 * Created by yang on 2015/11/23.
 */
var RedisClient = require('../index.js');

describe('RedisClient', function() {
    it('set', function() {
        var client = new RedisClient('192.168.1.120', 6379);
        client.set('test-set', 'test set value');
    });
    it('get', function(done) {
        this.timeout(0);
        var client = new RedisClient('192.168.1.120', 6379);
        client.get('test-set').then(function(data) {
            console.log(data);
            done();
        }).catch(done);
    });
    it('delete', function() {
        var client = new RedisClient('192.168.1.120', 6379);
        client.delete('test-set');
    });
    it('hmset', function() {
        var client = new RedisClient('192.168.1.120', 6379);
        client.set('test-hmset', {
            userId: 1234,
            userName: 'test'
        });
    });
    it('hmget', function(done) {
        this.timeout(0);
        var client = new RedisClient('192.168.1.120', 6379);
        client.hmget('test-hmset').then(function(data) {
            console.log(data);
            done();
        }).catch(done);
    });
});
import redis from 'redis';

const redisClient = redis.createClient({ socket: { host: 'redis', port: 6379 } })

// Implementing a Singleton class using Redis
class RedisSingleton {
  constructor() {
    if (!RedisSingleton.instance) {
      RedisSingleton.instance = this;
    }
    return RedisSingleton.instance;
  }

  async setData(key, value) {
    if (!redisClient.isReady) await redisClient.connect()
    return redisClient.set(key, value)
  }

  async getData(key) {
    if (!redisClient.isReady) await redisClient.connect()
    return redisClient.get(key)
  }
  async client() {
    if (!redisClient.isReady) await redisClient.connect()
    return redisClient
  }
  async status() {
    return redisClient.isReady;
  }
}

// Creating an instance of the RedisSingleton class
export default new RedisSingleton();
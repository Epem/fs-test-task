import mongo from '../conn/mongo.js';
import redis from '../conn/redis.js';


const status = (page) => {
    return async function (req, res, next) {
        const dbStatus = await mongo.connectionIsUp()
        const redisStatus = await redis.status();
        res.status(200).json({
            mongo: dbStatus,
            redis: redisStatus
        })
    }
}

export default (page) => {
    return [status(page)]
}
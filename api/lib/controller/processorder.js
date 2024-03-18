import mongo from '../conn/mongo.js';
import redis from '../conn/redis.js';

const processorder = (page) => {
    return async function (req, res, next) {

        const token = req.header('token');
        if (!token) return res.status(503).send();

        const response = await mongo.saveOrder(data);
        res.status(200).json({
            url: session.url
        })
    }
}

export default (page) => {
    return [processorder(page)]
}
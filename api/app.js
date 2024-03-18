import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import Redis from "./lib/conn/redis.js";
import RedisStore from "connect-redis"

import rateLimiter from "./lib/middlewares/rateLimiter.js";
import { bootstrapAPI } from "./lib/helpers/index.js";


const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(rateLimiter);
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    }));
    app.use(morgan("common"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.set('trust proxy', 1);

    const redisStore = new RedisStore({
        client: await Redis.client(),
        prefix: process.env.REDIS_PREFIX,
    });

    app.use(
        session({
            store: redisStore,
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false, // Set to true if using HTTPS
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
            },
        })
    );

    await bootstrapAPI(app);

    app.listen(process.env.PORT, async () => {
        console.log(`Server started on ${process.env.PORT} port`);
    });
}

main();
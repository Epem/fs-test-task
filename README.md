# FS-TASK
```
Project structure:
api - api service
fe - frontend application
mongo - mongo init data, and we store database in mongo/data folder after run
nginx - powerful optimized proxy for serving static and api, enabled caching in redis, and pagespeed optimization.
docker-compose.yml - dockerised whole project.
```

## INSTALLATION

copy env.example to .env in api, and nginx folders, in this files you can find configs.

```
cd api
npm i

cd ../fe
npm i
```




```
docker compose up api mongo redis # if we want rund development version

cd fe

npm run dev

```

Application will be available at http://localhost:5173/




```
npm run build # if we want run production dockerized version of frontend 

docker compose up

```

Application will be available at http://localhost


Api routes located at config.json, just follow this structure. Controllers described at this file, located at api/lib/controller


In this application implemented request rate limiter, so dont refresh to fast ;)


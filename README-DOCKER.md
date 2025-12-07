# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Use node version `24.10.0`

## Downloading

```
git clone {repository URL}
```

```
cd nodejs2025Q4-service
```

## Change branch

```
git checkout home-library-service-part-2
```

## Copy env example to env

```
cp .env.example .env
```

## Installing NPM modules

```
npm ci
```

## Pull docker images

```
docker-compose pull
```

## Start docker images

```
docker-compose up -d
```

## Check Node.js logs
```
docker-compose logs -f app
```

## Check that the containers (images) are working

```
docker ps
```

## Check docker restart after crush
```
docker ps  // for show ids
```
```
docker kill <container_id>
```
```
docker logs -f home-lib-db-mielomanka
```
or 

```
docker logs -f nodejs-service-mielomanka
```

## Check database files and logs to be stored in volumes instead of container
```
docker volume inspect nodejs2025q4-service_pgdata
```
```
docker volume inspect nodejs2025q4-service_pglogs
```

## For local assembly, change the ENV file to localhost
```
POSTGRES_HOST=localhost
```

## Scripts for vulnerabilities scanning

### With create separate file

```
npm run audit
```

### Output to the console

```
npm run audit:pretty
```

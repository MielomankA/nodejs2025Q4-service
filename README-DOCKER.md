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

## Copy env example to env

```
cp .env.example .env
```

## Installing NPM modules

```
npm install
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

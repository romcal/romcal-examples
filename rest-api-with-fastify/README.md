# Using romcal as a REST API with Fastify

From this project dir (`rest-api-with-fastify`):

```shell
cd rest-api-with-fastify

npm install
npm start
```

You can specify the port number by setting the `ROMCAL_APP_PORT` environment variable.

```shell
ROMCAL_APP_PORT=3000 npm start
```
And open the URL provided by the terminal.


You may also specify the log level by setting the `ROMCAL_LOG_LEVEL` environment variable.

```shell
ROMCAL_LOG_LEVEL=info npm start
```

Note: some browsers like Firefox has a built-in JSON viewer.
Another great tool to test REST APIs is [Postman](https://www.postman.com/).

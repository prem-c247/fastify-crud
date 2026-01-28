import Fastify from "fastify";
import postgres from "@fastify/postgres";
import routers from "./src/routes/index.js";
import jwtPlugin from './src/plugins/jwt.js';

const fastify = Fastify({
  logger: true
})

// register JWT plugins
fastify.register(jwtPlugin);

// register routes
fastify.register(routers, {prefix: '/api'});

// database connection simulation
fastify.register(postgres, {
  connectionString: 'postgres://admin:Admin@123@localhost/fastify_eg_db',
})

// Global error handler for logging errors and sending consistent error responses
fastify.setErrorHandler((error, request, reply) => {
  request.log.error(
    {
      err: error,
      url: request.url,
      method: request.method
    },
    'Request failed'
  );

  reply.code(error.statusCode || 500).send({
    message: error.message || 'Internal Server Error'
  });
});


// start server
const PORT = process.env.PORT || 3000;
fastify.listen({port: PORT}, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
});
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';


/**
 * Fastify plugin to handle JSON Web Tokens (JWT).
 *
 * Registers the @fastify/jwt plugin and decorates the 'authenticate' hook
 * to verify the JWT in the request.
 *
 */
const jwtPlugin = async (fastify) => {
 // Register the fastify-jwt plugin with the Fastify instance 
  fastify.register(fastifyJwt, {
    // Use an environment variable for the secret in production
    secret: process.env.JWT_SECRET || 'super-secret-key'
  });
  // Decorate the Fastify instance with an 'authenticate' function to verify JWTs 
  fastify.decorate( 'authenticate', async (request, reply) => {
    // Verify the JWT in the incoming request 
      await request.jwtVerify();
    });
};

// Export the plugin using fastify-plugin to ensure proper encapsulation
export default fp(jwtPlugin);

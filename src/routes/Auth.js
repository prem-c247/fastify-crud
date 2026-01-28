import fastify from "fastify"
import AuthController from '../controllers/Auth.js';

/**
 * Registers the login route with the Fastify instance.
 * The route is protected with the authentication middleware.
 * The route is:
 * - POST /login: Authenticates the user and returns a JWT token.
 */
export const UserAuth = async (fastify, options) => {
    fastify.post('/login', AuthController.Login);
}

export default UserAuth;


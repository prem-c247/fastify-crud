import UsersControlller from '../controllers/User.js';

/**
 * Registers the user routes with the Fastify instance.
 * The routes are protected with the authentication middleware.
 * The routes are:
 * - GET /users: Fetches the list of users.
 * - POST /users: Creates a new user.
 * - GET /users/:id: Fetches the user with the given ID.
 * - PUT /users/:id: Updates the user with the given ID.
 * - DELETE /users/:id: Deletes the user with the given ID.
 */
export const userRoutes = async (fastify, options) => {
    // Protect the routes with authentication middleware 
    fastify.get('/users', { preHandler: [fastify.authenticate] }, UsersControlller.UserList);
    // Create user route is also protected
    fastify.post('/users', { preHandler: [fastify.authenticate] }, UsersControlller.UserCreate);
    // Other routes can also be protected similarly
    fastify.get('/users/:id', { preHandler: [fastify.authenticate] }, UsersControlller.UserById);
    fastify.put('/users/:id', { preHandler: [fastify.authenticate] }, UsersControlller.UserUpdate);
    fastify.delete('/users/:id', { preHandler: [fastify.authenticate] }, UsersControlller.UserDelete);
}

export default userRoutes;
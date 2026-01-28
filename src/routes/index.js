import userRoutes from "./User.js";
import productRoutes from "./Product.js";
import authRoutes from "./Auth.js";

export const routers = async (fastify, options) => {
    userRoutes(fastify, options);
    productRoutes(fastify, options);
    authRoutes(fastify, options);
}

export default routers;
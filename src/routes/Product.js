export const productRoutes = async (fastify, options) => {
    fastify.get('/products', async (request, reply) => {
        reply.send({"message": "Product List fetched successfully"});
    });

    fastify.post('/products', async (request, reply) => {
        // Logic to create a new product
        reply.send({"message": "Product created successfully"});
    });
    
    fastify.get('/products/:id', async (request, reply) => {
        const { id } = request.params;
        // Logic to get product by id
        reply.send({"message": `Product details for ID: ${id}`});
    });
    fastify.put('/products/:id', async (request, reply) => {
        const { id } = request.params;
        // Logic to update product by id
        reply.send({"message": `Product with ID: ${id} updated successfully`});
    });
    fastify.delete('/products/:id', async (request, reply) => {
        const { id } = request.params;
        // Logic to delete product by id
        reply.send({"message": `Product with ID: ${id} deleted successfully`});
    });
}

export default productRoutes;
import UserService from '../services/user.service.js';

const UserList = async (request, reply) => {
    const listUsers = await UserService.listUsers(
        request.server.pg
    );
    // If no users found, return an empty array
    if (!listUsers || listUsers.length === 0) {
        return reply.send({
            data: [],
            message: "No users found"
        });
    }
    // If users found, return the list of users
    // Note: You can also add pagination or filtering logic here if needed
    // For now, we are just returning the list of users

    reply.code(200).send({ 
        data:listUsers, 
        "message": "User List fetched successfully" 
    });    
}

const UserCreate = async (request, reply) => {
  const user = await UserService.createUser(
    request.server.pg,
    request.body
  );

  reply.code(201).send({
    message: 'User created successfully',
    data: user
  });
};

const UserById = async (request, reply) => {
    const user = await UserService.getUserById(
        request.server.pg,
        request.params.id
    );
    reply.code(200).send({ data: user, "message": "User fetched successfully" });
}

const UserUpdate = async (request, reply) => {
    const checkUserExists = await UserService.findByEmail(
        request.server.pg,
        request.body.email
    );
    if(checkUserExists && checkUserExists.id !== parseInt(request.params.id)) {
        const error = new Error('User with this email already exists');
        error.statusCode = 409;
        throw error;
    }
    // Update user with the given ID
    const updatedUser = await UserService.updateUser(
        request.server.pg,
        request.params.id,
        request.body
    );
    // For now, just returning a success message
    reply.send({ data:updatedUser, "message": "User Updated Successfully" });
}

const UserDelete = async (request, reply) => {
    await UserService.deleteUser(
        request.server.pg,
        request.params.id
    );
    reply.send({"message": "User deleted successfully" });
}

export default {
    UserList,
    UserCreate,
    UserById,
    UserUpdate,
    UserDelete
};
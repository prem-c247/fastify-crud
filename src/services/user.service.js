import bcrypt from 'bcrypt';
import UserRepo from '../repositories/user.repository.js';


/**
 * Retrieves a list of all users from the database.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @returns {Promise<Array<User>>} - A promise that resolves with an array of user objects.
 */
const listUsers = async (pg) => {
    return await UserRepo.findAll(pg);
}

/**
 * Creates a new user in the database.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @param {Object} data - An object containing the user's data.
 * 
 * */
const createUser = async (pg, data) => {
  const { name, email, password } = data;
  // Check if a user with the given email already exists
  const existingUser = await UserRepo.findByEmail(pg, email);
  console.log('Existing User:', existingUser);
  // Check if user with the same email already exists
  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.statusCode = 409;
    throw error;
  }
  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 10);

 // Create a new user in the database and return the created user
  const user = await UserRepo.create(pg, {
    name,
    email,
    passwordHash
  });
  // Send response based on insertion result
  return user;
};

const getUserById = async (pg, id) => {
    const checkUserExists = await UserRepo.findById(pg, id);
    if(!checkUserExists) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return await UserRepo.findById(pg, id);
}

const updateUser = async (pg, id, data) => {
    return await UserRepo.update(pg, id, data);
    // For now, just returning a success message
}

const findByEmail = async (pg, email) => {
    return await UserRepo.findByEmail(pg, email);
}

const deleteUser = async (pg, id) => {
    const checkUserExists = await UserRepo.findById(pg, id);
    if(!checkUserExists) {
        const error = new Error('cannot delete, User not found');
        error.statusCode = 404;
        throw error;
    }
    return await UserRepo.deleteUser(pg, id);
}

export default {
    listUsers,
    createUser,
    getUserById,
    updateUser,
    findByEmail,
    deleteUser,
};

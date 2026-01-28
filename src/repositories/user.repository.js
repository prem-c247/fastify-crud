/**
 * Retrieves a list of all users from the database.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @returns {Promise<Array<User>>} - A promise that resolves with an array of user objects.
 */
const findAll = async (pg) => {
  const { rows } = await pg.query(
    'SELECT id, name, email, created_at FROM users'
  );
  return rows;
};

/**
 * Finds a user by their email address.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @param {string} email - The email address of the user to find.
 */
const findByEmail = async (pg, email) => {
  // Find user by email and return user id if found
  // TODO : For now using raw query, later move to use prisma orm or sequelize orm for better performance
  const { rows } = await pg.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );
  return rows[0]; // undefined if not found
};

/**
 * Creates a new user in the database.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @param {Object} data - An object containing the user's data.
 * 
 * */
const create = async (pg, data) => {
  const { name, email, passwordHash } = data;
  // Insert user into the database and return the created user
  // TODO : For now using raw query, later move to use prisma orm or sequelize orm for better performance
  const result = await pg.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, passwordHash]
  );

  return result.rows[0];
};


/**
 * Retrieves a user from the database by their ID.
 * @param {Pg} pg - An instance of the Pg database driver.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<User|undefined>} - A promise that resolves with a user object if found, or undefined if not found.
 */
const findById = async (pg, id) => {
  const { rows } = await pg.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]
  );
  return rows[0];
};

const update = async (pg, id, data) => {
  const { name, email } = data;
  // Update user in the database and return the updated user
  const result = await pg.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3
     RETURNING id, name, email`,
    [name, email, id]
  );
  return result.rows[0];
};

const deleteUser = async (pg, id) => {
  await pg.query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );
}

// 
export default {
  findAll,
  findByEmail,
  create,
  findById,
  update,
  deleteUser
};
import bcrypt from 'bcrypt';

const Login = async (request, reply) => {
    try {
        const { email, password } = request.body;
        // Authentication logic - replace with real logic
        const { rows } = await request.server.pg.query('SELECT * FROM users WHERE email=$1', [email]);
        // Check if user exists
        const user = rows[0];
        if (!user) {
            // User not found
            return reply.code(401).send({ message: 'Invalid credentials' });
        }
        // Compare passwords (should be replaced with real password hashing)
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password does not match return Invalid credentials
        if (!passwordMatch) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        // Generate a token for the user using JWT sign method
        const token = request.server.jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            { expiresIn: '1h' }
        );
        
        // unset password & created_at before sending user data
        delete user.password;
        delete user.created_at;
        return reply.code(201).send({ data: user, token: token, message: 'Login successful' });
    } catch (error) {
        console.log(error);
        reply.code(500).send({ message: 'Internal Server Error' });
    }
}

export default {
    Login
}
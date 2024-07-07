const jwt=require("jsonwebtoken");
const secret="Mahesh123"

function setUser(user) {
    // Assuming 'secret' is defined somewhere in your application
    const token = jwt.sign({
        id: user._id,
        email: user.email  ,
        password: user.password
    }, secret);
    return token;
}

function getUser(token) {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        // Handle specific JWT errors
        if (error instanceof jwt.TokenExpiredError) {
            console.log('Token expired');
            // Handle expired token error (e.g., return specific error message)
            throw new Error('Token expired');
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.log('JWT error:', error.message);
            // Handle other JWT errors (e.g., malformed token, invalid signature)
            throw new Error('Invalid token');
        } else {
            // Handle other unexpected errors
            console.error('Unexpected error:', error.message);
            throw new Error('Unexpected error');
        }
    }
}

module.exports={setUser,getUser};
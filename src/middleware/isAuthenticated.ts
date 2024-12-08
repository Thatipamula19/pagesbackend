import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing or unauthorized.' });
    }

    try {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: 'Malformed token.' });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        }
        jwt.verify(token, 'secret_this_is_employee_login', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token.' });
            }
            req.user = user;
            next();
        });
    } catch (err:any) {
        return res.status(403).json({ message: 'Invalid token format or other error.', error: err.message });
    }
};

export default  authenticateToken;

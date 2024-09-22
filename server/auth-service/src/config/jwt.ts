import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (user: {user_id: string, user_name: string}) : string => {
    return jwt.sign({id: user.user_id , user_name: user.user_name}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
};

export const verifyToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}
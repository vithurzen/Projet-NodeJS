import { User } from "../models";
import { LoginDto, SignupDto } from "../models/super_admin/auth.interface";
import { userModel } from "../models/super_admin/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {

    private generateToken(userId: string, role: string): string {
        const payload = {
            sub: userId,
            role,
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(payload, secret, {
            expiresIn: "7d"
        });

        return token;
    }

    async signup(signupDto: SignupDto): Promise<{ token: string; user: Partial<User> }> {
        const { firstName, lastName, email, password, telephone, dateOfBirth, role } = signupDto;

        if (!email || !password) {
        throw new Error("Email and password are required");
        }

        const newEmail = email.trim().toLowerCase();

        const userExist = await userModel.findOne({ email: newEmail });        
        if (userExist) {
            throw new Error("User with this email already exist");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email: newEmail,
            password: passwordHash,
            telephone,
            dateOfBirth,
            role,
        })

        const token = this.generateToken(user._id.toString(), user.role);

        return {
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telephone: user.telephone,
                dateOfBirth: user.dateOfBirth,
                role: user.role,
            }
        }
    }

    async login(loginDto: LoginDto): Promise<{ token: string; user: Partial<User> }> {
        const { email, password } = loginDto;
        if (!email || !password) {
        throw new Error("Email and password are required");
        }

        const newEmail = email.trim().toLowerCase();
        const user = await userModel.findOne({email: newEmail});

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new Error("Invalid email or password");
        }

        const token = this.generateToken(user._id.toString(), user.role);

        return {
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telephone: user.telephone,
                dateOfBirth: user.dateOfBirth,
                role: user.role,
            }
        }

    }



}
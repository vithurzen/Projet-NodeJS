import { User } from "../models";
import { userModel } from "../models/super_admin/user.model";
import bcrypt from "bcrypt";

export class UserService {
    async createUser(user: User): Promise<User> {
        const email = user.email.trim().toLowerCase();
        const password = user.password;
        if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const created = await userModel.create({
            ...user,
            email,
            password: hashedPassword,
        });

        const obj = created.toObject() as User;
        delete (obj as any).password;

        return obj;
    }

    async getUserById(id: string): Promise<User> {
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await userModel.find();
        return users;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const updatedUser = await userModel.findByIdAndUpdate(id, user,{ new: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }

    async deactivateUser(id: string): Promise<User> {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
    }

    async activateUser(id: string): Promise<User> {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
    }

    async deleteUser(id: string): Promise<void> {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
    }
}
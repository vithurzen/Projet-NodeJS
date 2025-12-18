import { User } from "../models";
import { SignupDto } from "../models/super_admin/auth.interface";
import { userModel } from "../models/super_admin/user.model";
import { sha256 } from "../utils/security.utils";

export class UserService {

    async isEmpty(): Promise<boolean> {
        const user = await userModel.findOne();
        return user === null;
    }

    createUser(dto: SignupDto): Promise<User> {
        return userModel.create({
            ...dto,
            password: sha256(dto.password, 'c@rt3l'),
        });
    }

    findActiveUser(login: string, password: string): Promise<User | null> {
        return userModel.findOne({
            email: login,
            password: sha256(password, 'c@rt3l'),
            isActive: true
        });
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
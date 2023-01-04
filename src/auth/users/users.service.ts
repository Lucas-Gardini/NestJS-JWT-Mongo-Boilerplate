import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./users.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "src/@types/user";
import { hash } from "bcrypt";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
		this.startup();
	}

	async startup() {
		const defaultUser: IUser = JSON.parse(process.env.DEFAULT_USER);

		const user = await this.findUserByEmail(defaultUser.email);

		if (!user) {
			await this.createUser(defaultUser);
		}
	}

	async findUserByEmail(email: string) {
		return await this.userModel.findOne({ email });
	}

	async getRoles(userId: string) {
		const user = await this.userModel.findById(userId).select("roles").exec();

		return user.roles;
	}

	async createUser(user: IUser) {
		const hashedPassword = await this.hashPassword(user.password);

		const createdUser = new this.userModel({
			...user,
			password: hashedPassword,
		});

		return await createdUser.save();
	}

	async hashPassword(password: string) {
		return await hash(password, Number(process.env.SALT_ROUNDS));
	}
}

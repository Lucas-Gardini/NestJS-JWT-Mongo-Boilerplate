import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUser } from "src/@types/user";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(email: string, pass: string): Promise<Omit<IUser, "password">> {
		const user = await this.usersService.findUserByEmail(email);
		if (!user) throw new UnauthorizedException("Usuário não encontrado");

		const compared = await compare(pass, user.password);
		if (!compared) throw new UnauthorizedException("Senha incorreta");

		const result: any = { ...user };

		delete result._doc.password;
		delete result._doc.__v;
		delete result._doc._id;

		return result._doc;
	}

	async login(user: IUser) {
		const validated = await this.validateUser(user.email, user.password);
		const payload = { ...validated };

		return {
			access_token: this.jwtService.sign(payload),
			expires_in: process.env.JWT_EXPIRES_IN,
		};
	}
}

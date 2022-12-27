import { Controller, Post, Request, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IUser } from "src/@types/user";
import { Public } from "src/utils/decorators/public";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("login")
	async login(@Request() req: { body: IUser }) {
		return this.authService.login(req.body);
	}

	@Get("info")
	getProfile(@Request() req) {
		return req.user;
	}
}

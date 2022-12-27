import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import * as chalk from "chalk";
import { IUser } from "src/@types/user";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const user: IUser = req.user as IUser;

		let message = `${chalk.yellow("[REQUEST]")} ${DateTime.now().toLocaleString({ dateStyle: "short" }, { locale: "pt-BR" })} `;
		if (user !== null && user !== undefined && typeof user === "object") {
			message = message + `${user.name} `;
		}
		message = message + `- ${req.method} ${req.path}`;

		console.log(message);
		next();
	}
}

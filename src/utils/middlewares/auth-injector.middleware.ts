import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthInjector implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const user = jwt.decode(req.headers.authorization?.split(" ")[1]);

		// inject user into request
		req.user = user;

		next();
	}
}

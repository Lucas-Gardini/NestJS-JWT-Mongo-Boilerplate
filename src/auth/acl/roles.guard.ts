import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../utils/enums/roles.enum";
import { ROLES_KEY } from "./roles.decorator";
import { UsersService } from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, @Inject(UsersService) private usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		if (user) {
			const roles = await this.usersService.getRoles(user._id);
			return requiredRoles.some((role) => roles.includes(role));
		} else {
			return false;
		}
	}
}

import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { Roles } from "../acl/roles.decorator";
import { Role } from "../../utils/enums/roles.enum";

@Controller("users")
export class UsersController {
	@Roles(Role.Admin)
	@Get()
	getUsers() {
		return "This action returns all users";
	}

	@Post()
	createUser() {
		return "This action adds a new user";
	}

	@Roles(Role.Admin)
	@Put(":id")
	updateUser() {
		return "This action updates a user";
	}

	@Put("")
	updateCurrentUser() {
		return "This action updates a user";
	}

	@Roles(Role.Admin)
	@Delete(":id")
	deleteUser() {
		return "This action deletes a user";
	}

	@Delete()
	deleteCurrentUser() {
		return "This action deletes a user";
	}
}

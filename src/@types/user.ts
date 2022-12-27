import { ObjectId } from "mongoose";
import { Role } from "../utils/enums/roles.enum";

export interface IUser {
	_ìd?: ObjectId;
	email: string;
	password: string;
	name?: string;
	roles?: Role[];
}

import { ObjectId } from "mongoose";

export interface IUser {
	_ìd?: ObjectId;
	email: string;
	password: string;
	name?: string;
}

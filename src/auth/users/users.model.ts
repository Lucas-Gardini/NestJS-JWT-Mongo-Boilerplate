import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "@/utils/enums/roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({ unique: true, required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	name: string;

	@Prop({ type: [String], enum: Role, default: [Role.User] })
	roles: string[];

	@Prop({ default: Date.now() })
	createdAt: Date;

	@Prop({ default: Date.now() })
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

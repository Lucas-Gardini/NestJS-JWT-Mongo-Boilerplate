import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "~/src/auth/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const secret = configService.get("JWT_SECRET");
				const expiresIn = configService.get("JWT_EXPIRES_IN");

				return {
					secret,
					signOptions: {
						expiresIn,
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./auth/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt.guard";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";
import { AuthInjector } from "./utils/middlewares/auth-injector.middleware";
import { RolesGuard } from "./auth/acl/roles.guard";

@Module({
	imports: [ConfigModule.forRoot({ envFilePath: ".env" }), MongooseModule.forRoot(`${process.env.DATABASE_URL}`, { dbName: "vue-crud" }), AuthModule, UsersModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthInjector).forRoutes("*");
		consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}

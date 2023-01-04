import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as chalk from "chalk";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT || 3000);

	console.log(`\n${chalk.blue("[APPLICATION]")} Running on: ${await app.getUrl()}`);
}

bootstrap();

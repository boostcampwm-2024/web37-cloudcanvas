import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_README } from './swagger.readme';

export const swaggerConfig = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Cloud Canvas API')
        .setDescription(SWAGGER_README)
        .setVersion('1.0')
        .addTag('API')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documentFactory);
};

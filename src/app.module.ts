import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { AuthModule } from './modules/auth/auth.module';
import indexConfig from './modules/common/config/index.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [indexConfig] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_IP,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 5432,
      synchronize: true,
      autoLoadEntities: true,
      // dropSchema: true,
      // dropSchema: true,
    }),
    UserModule,
    MerchantModule,
    CategoryModule,
    ProductModule,
    SubCategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

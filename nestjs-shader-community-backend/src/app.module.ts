import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ShadersModule } from './modules/shaders/shaders.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    ShadersModule,
    GamificationModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
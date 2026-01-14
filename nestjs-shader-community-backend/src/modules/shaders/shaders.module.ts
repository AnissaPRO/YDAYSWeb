import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShadersController } from './shaders.controller';
import { ShadersService } from './shaders.service';
import { Shader } from './entities/shader.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shader]),
    FilesModule,
  ],
  controllers: [ShadersController],
  providers: [ShadersService],
  exports: [ShadersService],
})
export class ShadersModule {}
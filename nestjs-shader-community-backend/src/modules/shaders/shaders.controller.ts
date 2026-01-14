import { Request as ExpressRequest } from 'express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Request } from '@nestjs/common';
import { ShadersService } from './shaders.service';
import { CreateShaderDto } from './dto/create-shader.dto';
import { Shader } from './entities/shader.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';


interface RequestWithUser extends ExpressRequest {
  user: {
    userId: string;
    username: string;
  }
}
@Controller('shaders')

export class ShadersController {
  constructor(
    private readonly shadersService: ShadersService,
  ) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createShaderDto: CreateShaderDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: RequestWithUser,
  ): Promise<Shader> {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.shadersService.create(createShaderDto, file, req.user.userId);
  }

  @Get()
  findAll(): Promise<Shader[]> {
    return this.shadersService.findAll();
  }
}
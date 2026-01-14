import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shader } from './entities/shader.entity';
import { CreateShaderDto } from './dto/create-shader.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ShadersService {
  constructor(
    @InjectRepository(Shader)
    private readonly shaderRepository: Repository<Shader>,
    private readonly filesService: FilesService,
  ) {}

  async create(createShaderDto: CreateShaderDto, file: Express.Multer.File, authorId: string): Promise<Shader> {
    const url = await this.filesService.uploadShader(file);
    const shader = this.shaderRepository.create({
      ...createShaderDto,
      url,
      authorId,
    });
    return this.shaderRepository.save(shader);
  }

  async findAll(): Promise<Shader[]> {
    return this.shaderRepository.find();
  }

  async findOne(id: number): Promise<Shader | null> {
  return this.shaderRepository.findOneBy({ id }); 
}
}
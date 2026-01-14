import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const achievement = this.achievementRepository.create(createAchievementDto);
    return this.achievementRepository.save(achievement);
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async findOne(id: number): Promise<Achievement | null> {
    return this.achievementRepository.findOne({ where: { id: id } });
  }
}
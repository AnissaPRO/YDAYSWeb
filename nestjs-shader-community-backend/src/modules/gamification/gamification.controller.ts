import { Controller, Get, Post, Body } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('achievements')
  create(@Body() createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    return this.gamificationService.create(createAchievementDto);
  }

  @Get('achievements')
  findAll(): Promise<Achievement[]> {
    return this.gamificationService.findAll();
  }
}
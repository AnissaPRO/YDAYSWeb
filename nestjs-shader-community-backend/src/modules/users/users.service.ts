import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

   async create(createUserDto: CreateUserDto): Promise<User> {
    // Vérifier si le pseudo existe déjà
    const existingUser = await this.usersRepository.findOneBy({ username: createUserDto.username });
    if (existingUser) {
      throw new ConflictException('Ce pseudo est déjà utilisé');
    }
    const { username, password } = createUserDto;

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    
    const newUser = this.usersRepository.create({
      username: username,
      password: hashedPassword,
      level: 1,
      xp: 0,
    });

    const savedUser = await this.usersRepository.save(newUser);
  
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneBy(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({id});
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}
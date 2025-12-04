import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { ListUsersQueryDto } from './dto/list-users-query-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  // #region SEED USERS
  // if db dont have 10 users => seed 10 users as default state of db
  async onModuleInit() {
    const count = await this.usersRepo.count();

    if (count === 10) {
      return;
    }

    const seedUsers: CreateUserDto[] = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        adress: '123 Main St',
        city: 'New York',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        company: 'Globex',
        adress: '456 Market St',
        city: 'San Francisco',
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        company: 'Innotech',
        adress: '789 Elm St',
        city: 'Chicago',
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
        company: 'Cyberdyne',
        adress: '42 Future Rd',
        city: 'Los Angeles',
      },
      {
        name: 'Charlie Green',
        email: 'charlie@example.com',
        company: 'Umbrella Corp',
        adress: '99 Evil Ave',
        city: 'Raccoon City',
      },
      {
        name: 'Dave Miller',
        email: 'dave@example.com',
        company: 'Wayne Enterprises',
        adress: '100 Gotham St',
        city: 'Gotham',
      },
      {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        company: 'Stark Industries',
        adress: '500 Malibu Point',
        city: 'Malibu',
      },
      {
        name: 'Frank Thomas',
        email: 'frank@example.com',
        company: 'Hooli',
        adress: '1 Silicon Valley',
        city: 'Palo Alto',
      },
      {
        name: 'Grace Lee',
        email: 'grace@example.com',
        company: 'Black Mesa',
        adress: 'Lambda Complex',
        city: 'New Mexico',
      },
      {
        name: 'Henry Clark',
        email: 'henry@example.com',
        company: 'Tyrell Corp',
        adress: '2019 Blade Runner St',
        city: 'Los Angeles',
      },
    ];

    await this.usersRepo.save(this.usersRepo.create(seedUsers));
    console.log('✅ Seeded 10 users');
  }

  // #endregion SEED USERS

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.usersRepo.create(data);
    return this.usersRepo.save(newUser);
  }

  findAll(query: ListUsersQueryDto): Promise<User[]> {
    const { search } = query;

    if (!search) {
      return this.usersRepo.find({ order: { id: 'ASC' } });
    }

    return this.usersRepo.find({
      where: [{ name: ILike(`%${search}%`) }, { email: ILike(`%${search}%`) }],
      order: { id: 'ASC' },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('user not found');
    }
  }
}

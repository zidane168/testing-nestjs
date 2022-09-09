import {
  Body,
  CACHE_MANAGER,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Post()
  async check(
    @Body('id1') id1: string,
    @Body('id2') id2: string,
    @Res() res: Response,
  ): Promise<any> {
    const cachedData = await this.cacheService.get(`${id1}_${id2}`);
    if (cachedData) {
      console.log('Getting data from cache!');
      return res.status(HttpStatus.OK).json(cachedData);
    }
    const isExisted = await this.userService.findOne(id1, id2);
    if (isExisted) {
      await this.cacheService.set(`${id1}_${id2}`, isExisted);
      return res.status(HttpStatus.OK).json(isExisted);
    } else {
      const created = await this.userService.createUser({
        id1,
        id2,
        userID: uuid(),
      });
      await this.cacheService.set(`${id1}_${id2}`, created);
      return res.status(HttpStatus.CREATED).json(created);
    }
  }
}

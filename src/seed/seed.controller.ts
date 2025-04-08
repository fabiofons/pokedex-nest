import { Controller, Get, HttpCode } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @HttpCode(201)
  executeSeed() {
    return this.seedService.fillDB();
  }
}

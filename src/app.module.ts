import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { JoiValidationSchema } from './config/joi.validationSchema';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { appConfig } from './config/app.config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(
      process.env.MONGODB || 'mongodb://localhost:27017/nest-pokemon',
      {
        dbName: 'pokemonsdb',
      },
    ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}

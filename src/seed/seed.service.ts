import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
// import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async fillDB(): Promise<string> {
    await this.pokemonModel.deleteMany();

    // axios way
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    //fetch way
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=650');
    // const data = (await response.json()) as PokeResponse;

    // const insertPokePromises: Promise<CreatePokemonDto>[] = []; //slowy way
    const pokemonToInsert: { name: string; number: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const number = Number(url.split('/').at(-2));

      // insertPokePromises.push(this.pokemonModel.create({ name, number })); //slowy way
      pokemonToInsert.push({ name, number });
    });

    // await Promise.all(insertPokePromises); //slowy way
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed excuted';
  }
}

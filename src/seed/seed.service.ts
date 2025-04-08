import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  async fillDB(): Promise<any> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=6');
    const data = (await response.json()) as PokeResponse;
    const pokemons = data.results.map(({ name, url }) => {
      const number = Number(url.split('/').at(-2));
      return { name, number };
    });
    return pokemons;
  }
}

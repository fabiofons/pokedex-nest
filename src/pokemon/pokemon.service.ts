import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

interface DBError {
  code: number;
  keyValue: {
    name: string;
  };
}

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if ((error as DBError).code === 11000)
        throw new BadRequestException(
          `Pokemon already exists in db ${JSON.stringify((error as DBError).keyValue)}`,
        );

      throw new InternalServerErrorException(
        'Cannot create Pokemon - Check server logs',
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    console.log(term);
    let pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ number: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon "${term}" not found`);

    return pokemon as Pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();

    await pokemon.updateOne(updatePokemonDto);

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }
  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Artist } from 'src/types/artist';
import { randomUUID } from 'node:crypto';
import { CreateArtistDto } from 'src/dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  create(dto: CreateArtistDto) {
    if (!dto.name || dto.grammy === undefined) {
      throw new BadRequestException('Invalid DTO');
    }

    const artist: Artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };

    this.artists.push(artist);

    return artist;
  }

  update(id: string, dto: CreateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    artist.name = dto.name;
    artist.grammy = dto.grammy;

    return artist;
  }

  delete(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.splice(index, 1);
  }
}

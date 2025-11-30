import { Injectable } from '@nestjs/common';
import { Artist } from 'src/types/artist';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(dto: Artist) {
    this.artists.push(dto);
  }

  update(id: string, dto: Artist) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new Error('Artist not found');
    }

    this.artists[index] = dto;
  }

  delete(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new Error('Artist not found');
    }

    this.artists.splice(index, 1);
  }
}

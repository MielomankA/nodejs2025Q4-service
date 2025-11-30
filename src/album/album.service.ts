import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from 'src/dto/create-album.dto';
import { Album } from 'src/types/album';
import { randomUUID } from 'node:crypto';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(private readonly tracksService: TracksService) {}

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  create(dto: CreateAlbumDto) {
    const album: Album = {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };

    this.albums.push(album);

    return album;
  }

  update(id: string, dto: CreateAlbumDto) {
    const album = this.findOne(id);

    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId ?? null;

    return album;
  }

  delete(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.tracksService.removeAlbumLinks(id);

    this.albums.splice(index, 1);
  }
}

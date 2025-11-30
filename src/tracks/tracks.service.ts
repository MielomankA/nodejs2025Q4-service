import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/dto/create-track.dto';
import { Track } from 'src/types/track';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  create(dto: CreateTrackDto) {
    const track: Track = {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };

    this.tracks.push(track);
    return track;
  }

  update(id: string, dto: CreateTrackDto) {
    const track = this.findOne(id);

    track.name = dto.name;
    track.artistId = dto.artistId ?? null;
    track.albumId = dto.albumId ?? null;
    track.duration = dto.duration;

    return track;
  }

  delete(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(index, 1);
  }

  removeAlbumLinks(albumId: string) {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}

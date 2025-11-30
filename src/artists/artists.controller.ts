import { Controller } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from 'src/dto/create-artist.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Body, Delete, Get, HttpCode, Param, Put, Post } from '@nestjs/common';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: CreateArtistDto,
  ) {
    return this.artistsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.delete(id);
  }
}

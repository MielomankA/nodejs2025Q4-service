import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

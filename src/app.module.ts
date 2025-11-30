import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, ArtistsModule, TracksModule, AlbumModule],
  controllers: [AppController, AlbumController],
  providers: [AppService],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { JwtPayload, decode } from 'jsonwebtoken';
import { AddToFavoritesDto } from './dtos/favorites.dto';

@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getFavorites(@Headers() headers) {
    return await this.favoritesService.getFavorites(
      (decode(headers.authorization?.split(' ')[1]) as JwtPayload).email,
    );
  }

  @Post()
  async addToFavorite(@Body() payload: AddToFavoritesDto, @Headers() headers) {
    return await this.favoritesService.addtoFavorites(
      payload,
      (decode(headers.authorization?.split(' ')[1]) as JwtPayload).email,
    );
  }

  @Delete(':id')
  async addFromFavorites(@Body() payload: AddToFavoritesDto, @Param('id') id) {
    return await this.favoritesService.removeFromFavorites(payload, id);
  }
}

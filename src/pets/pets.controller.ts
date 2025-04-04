import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { authGuard, CustomRequest } from 'src/guards/auth.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@UseGuards(authGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() req: CustomRequest) {
    Logger.log(`USER ${req.user} IS TRYING TO CREATE A PET`);
    return this.petsService.create(createPetDto, req);
  }

  @Get()
  findAll(@Req() req: CustomRequest) {
    Logger.log(`USER ${req.user} IS TRYING TO FIND ALL PETS`);
    return this.petsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    Logger.log(`USER ${req.user} IS TRYING TO GET PET WITH ID ${id}`);
    return this.petsService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @Req() req: CustomRequest,
  ) {
    Logger.log(`USER ${req.user} IS TRYING TO UPDATE PET WITH ID ${id}`);
    return this.petsService.update(id, updatePetDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: CustomRequest) {
    Logger.log(`USER ${req.user} IS TRYING TO DELETE PET WITH ID ${id}`);
    return this.petsService.remove(id, req);
  }
}

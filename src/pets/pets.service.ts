import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schemas/pet.schema';
import { CustomRequest } from 'src/guards/auth.guard';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  create(createPetDto: CreatePetDto, req: CustomRequest): Promise<Pet> {
    try {
      const pet = new this.petModel(createPetDto);
      Logger.log(`USER ${req.user} CREATED A PET SUCCESSFULLY`);
      return pet.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(req: CustomRequest): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findOne(id: string, req: CustomRequest): Promise<Pet> {
    const pet = await this.petModel.findById(id);
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    Logger.log(`USER ${req.user} GOT A PET SUCCESSFULLY`);
    return pet;
  }

  async update(
    id: string,
    updatePetDto: UpdatePetDto,
    req: CustomRequest,
  ): Promise<Pet> {
    const updatePet = await this.petModel.findByIdAndUpdate(id, updatePetDto, {
      new: true,
    });
    if (!updatePet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    Logger.log(`USER ${req.user} UPDATED A PET SUCCESSFULLY`);
    return updatePet;
  }

  async remove(id: string, req: CustomRequest): Promise<void> {
    const result = await this.petModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    Logger.log(`USER ${req.user} DELETED A PET SUCCESSFULLY`);
  }
}

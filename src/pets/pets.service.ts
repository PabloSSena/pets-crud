import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schemas/pet.schema';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  create(createPetDto: CreatePetDto): Promise<Pet> {
    try {
      const pet = new this.petModel(createPetDto);
      return pet.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id);
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const updatePet = await this.petModel.findByIdAndUpdate(id, updatePetDto, {
      new: true,
    });
    if (!updatePet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return updatePet;
  }

  async remove(id: string): Promise<void> {
    const result = await this.petModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
  }
}

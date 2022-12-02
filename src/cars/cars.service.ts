import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        //Mane de exepciones (Exeption filter)
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    crate(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);
        //Validación opcional
        if(updateCarDto.id && updateCarDto.id !== id){
            throw new BadRequestException('Car id is not valid inside body');
        }
        this.cars = this.cars.map( car => {
            if(car.id === id) {
                carDB = {...carDB, ...updateCarDto, id}
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        this.cars = this.cars.filter( car => car.id !== id);
    }

    fillCarsWithSeeData(cars: Car[]){
        this.cars = cars;
    }

}

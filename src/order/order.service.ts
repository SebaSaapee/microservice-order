import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CARRITO } from 'src/common/models/models';
import { CarritoDTO } from './dto/carrito.dto';
import { ICarrito } from 'src/common/interface/carrito.interface';

@Injectable()
export class CarritoService {
constructor(@InjectModel(CARRITO.name) private readonly model: Model<ICarrito>){}

async create(carritoDTO:CarritoDTO): Promise<ICarrito>{
    const newUser = new this.model(carritoDTO);
    return await newUser.save()    
}
async findAll(): Promise<ICarrito[]>{
    return await this.model.find().populate('products')
}

async findOne(id:string): Promise<ICarrito>{
    return await this.model.findById(id).populate('products');
}
async update(id:string, carritoDTO:CarritoDTO): Promise<ICarrito>{
    const carrito = carritoDTO;
    return await this.model.findByIdAndUpdate(id, carrito, {new: true});
}
async delete(id:string){
    await this.model.findByIdAndDelete(id);
    return {status:HttpStatus.OK,msg:'deleted'}
}
async addProduct(carritoId:string,productId:string): Promise<ICarrito>{
    return await this.model.findByIdAndUpdate(
        carritoId,
        {$addToSet:{products:productId}
    },{new: true}
    ).populate('products')
}
}

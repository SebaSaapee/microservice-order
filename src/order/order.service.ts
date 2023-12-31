import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ORDER } from '../common/models/models';
import { OrderDTO } from './dto/order.dto';
import { IOrder } from '../common/interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(ORDER.name) 
        private readonly model: Model<IOrder>
        
    ){}

    async create(OrderDTO:OrderDTO): Promise<IOrder>{
        const newUser = new this.model(OrderDTO);
        return await newUser.save()    
    }
    async findAll(): Promise<IOrder[]>{
        return await this.model.find();
    }

    async findOne(id:string): Promise<IOrder>{
        return await this.model.findById(id).populate('products');
    }
    async update(id:string, OrderDTO:OrderDTO): Promise<IOrder>{
        const Order = OrderDTO;
        return await this.model.findByIdAndUpdate(id, Order, {new: true});
    }
    async delete(id:string){
        await this.model.findByIdAndDelete(id);
        return {status:HttpStatus.OK,msg:'deleted'}
    }
    
    /*
    async addProduct(OrderId:string,productId:string): Promise<IOrder>{
        return await this.model.findByIdAndUpdate(
            OrderId,
            {$addToSet:{products:productId}
        },{new: true}
        ).populate('products')
    }

    */
    
    async update2(id: string, orderDTO: OrderDTO): Promise<IOrder> {
        return await this.model.findByIdAndUpdate(id, orderDTO, { new: true }).populate('products');
    }

    async addProduct(orderId: string, productoId: string): Promise<IOrder> {
        return await this.model.findByIdAndUpdate(
            orderId,
            { $addToSet: { productos: productoId } },
            { new: true }
        );
    }
}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { OrderMSG } from '../common/constants';
import {MessagePattern, Payload} from '@nestjs/microservices'

@Controller()
export class OrderController {

    constructor( private readonly orderService: OrderService){}   
    
    @MessagePattern(OrderMSG.CREATE)
    create(@Payload() orderDTO:OrderDTO){
        return this.orderService.create(orderDTO);    
    }
    @MessagePattern(OrderMSG.FIND_ALL)
    findAll(){
        return this.orderService.findAll();
    }
    @MessagePattern(OrderMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.orderService.findOne(id);
    }

    @MessagePattern(OrderMSG.UPDATE)
    update(@Payload() payload){
        return this.orderService.update(payload.id,payload.orderDTO);
    }

    @MessagePattern(OrderMSG.DELETE)
    delete(@Payload('id') id:string){
        return this.orderService.delete(id);
    }

    @MessagePattern(OrderMSG.ADD_Product)
    addproducto(@Payload() payload){
        return this.orderService.addProduct(
            payload.orderId,
            payload.productId
        )
    }
}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { OrderMSG } from 'src/common/constants';
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
  //  @Post(':orderId/product/:productId')
   // async addProduct(
    //    @Param('orderId') orderId:string,
     //   @Param('productId') productId:string
      //  ){
       // const product = await this.productService.findOne(productId);
        //if(!product)
         //   throw new HttpException('Producto not Found', HttpStatus.NOT_FOUND);
//
  //      return this.orderService.addProduct(orderId,productId);
    //}



}

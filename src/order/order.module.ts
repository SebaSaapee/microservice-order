import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ORDER, PRODUCT, USER } from 'src/common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './Schema/order.schema';
import { ProductSchema } from './Schema/product.schema';



@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
      name:ORDER.name,
      useFactory:()=>OrderSchema.plugin(require('mongoose-autopopulate'))
      },
      {
        name:PRODUCT.name,
        useFactory:()=> ProductSchema,

        },
        
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  
})
export class OrderModule {}

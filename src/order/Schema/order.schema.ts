import * as mongoose from 'mongoose';
import { ProductSchema } from '../Schema/product.schema';

export const OrderSchema = new mongoose.Schema(
    {
    fecha:{type:Date, required:false},

    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Asegúrate de que esto coincida con el nombre de tu modelo de producto
    }]

    },
    { timestamps: true}
    )
    
    
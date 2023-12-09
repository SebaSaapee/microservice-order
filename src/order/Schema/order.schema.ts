import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
    {
    fecha:{type:Date, required:false},
    

    },
    { timestamps: true}
    )
    
    
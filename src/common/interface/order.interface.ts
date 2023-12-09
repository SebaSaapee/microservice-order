import { IProducto } from "./producto.interface";
import { IUser } from "./user.interface";

export interface IOrder{
    _id?: string;
    fechaDate: Date;
    producto: IProducto[];
    user: IUser[];
}
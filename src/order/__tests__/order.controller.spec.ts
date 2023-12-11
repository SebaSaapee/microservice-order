import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { OrderDTO } from '../dto/order.dto';
import { IOrder } from '../../common/interface/order.interface';
import { OrderModule } from '../order.module';
import { getModelToken } from '@nestjs/mongoose';
import { ORDER, PRODUCT } from '../../common/models/models';
import { HttpStatus } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getModelToken(ORDER.name),
          useValue: jest.fn(), // Mock para el modelo ORDER
        },
        {
          provide: getModelToken(PRODUCT.name),
          useValue: jest.fn(), // Mock para el modelo PRODUCT
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('findAll', () => {
    it('should return an array of type Order', async () => {
      const mockOrders: IOrder[] = [
        {
          _id: 'order-id-1',
          fechaDate: new Date('2021-01-01'),
          producto: [
            {
              name: 'Producto A',
              email: 'contacto@productoA.com',
              precio: '100'
            },
            {
              name: 'Producto B',
              email: 'contacto@productoB.com',
              precio: '150'
            }
          ],
          user: [
            {
              name: 'Usuario 1',
              username: 'usuario1',
              email: 'usuario1@example.com',
              password: 'password1'
            }
          ]
        },
        {
          _id: 'order-id-2',
          fechaDate: new Date('2021-02-02'),
          producto: [
            {
              name: 'Producto C',
              email: 'contacto@productoC.com',
              precio: '200'
            }
          ],
          user: [
            {
              name: 'Usuario 2',
              username: 'usuario2',
              email: 'usuario2@example.com',
              password: 'password2'
            }
          ]
        }
      ];
      
      jest.spyOn(orderService, 'findAll').mockImplementation(() => Promise.resolve(mockOrders));

      const result = await controller.findAll();
      expect(result).toHaveLength(mockOrders.length); // Verificar la cantidad de pedidos
      expect(result).toEqual(mockOrders); // Verificar que el resultado sea igual a los pedidos simulados
      expect(orderService.findAll).toHaveBeenCalledTimes(1); // Verificar que el servicio se haya llamado una vez
    });
  });


  
  describe('findOne', () => {
    it('should return a single order', async () => {
      const orderId = 'order-id-1';
      const mockOrder: IOrder = {
        _id: orderId,
        fechaDate: undefined,
        producto: [],
        user: []
      };

      jest.spyOn(orderService, 'findOne').mockImplementation(() => Promise.resolve(mockOrder));

      const result = await controller.findOne(orderId);
      expect(result).toEqual(mockOrder);
      expect(orderService.findOne).toHaveBeenCalledWith(orderId);
    });
  });
  describe('create', () => {
    it('should create and return the order', async () => {
      const orderDTO: OrderDTO = {
        fecha: undefined
      };
      const createdOrder: IOrder = {
        fechaDate: undefined,
        producto: [],
        user: []
      };

      jest.spyOn(orderService, 'create').mockImplementation(() => Promise.resolve(createdOrder));

      const result = await controller.create(orderDTO);
      expect(result).toEqual(createdOrder);
      expect(orderService.create).toHaveBeenCalledWith(orderDTO);
    });
  });

  describe('update', () => {
    it('should update and return the order', async () => {
      const orderId = 'order-id-1';
      const orderDTO: OrderDTO = {
        fecha: undefined
      };
      const updatedOrder: IOrder = {
        fechaDate: undefined,
        producto: [],
        user: []
      };

      jest.spyOn(orderService, 'update').mockImplementation(() => Promise.resolve(updatedOrder));

      const result = await controller.update({ id: orderId, orderDTO });
      expect(result).toEqual(updatedOrder);
      expect(orderService.update).toHaveBeenCalledWith(orderId, orderDTO);
    });
  });
  describe('delete', () => {
    it('should delete the order and return a result', async () => {
      const orderId = 'order-id-1';
      const deleteResult = {
        status: HttpStatus.OK,  // Asumiendo que usas HttpStatus de @nestjs/common
        msg: 'Order successfully deleted'
      };
  
      jest.spyOn(orderService, 'delete').mockImplementation(() => Promise.resolve(deleteResult));
  
      const result = await controller.delete(orderId);
      expect(result).toEqual(deleteResult);
      expect(orderService.delete).toHaveBeenCalledWith(orderId);
    });
  });

});

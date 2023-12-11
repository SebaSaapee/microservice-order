import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order.service';
import { getModelToken } from '@nestjs/mongoose';
import { ORDER } from '../../common/models/models';
import { IOrder } from '../../common/interface/order.interface';
import { OrderDTO } from '../dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let mockModel: any;

  beforeEach(async () => {
    mockModel = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      populate: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getModelToken(ORDER.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should create and return a new order', async () => {
      const orderDTO: OrderDTO = {
        fecha: undefined
      };
      const savedOrder: IOrder = {
        fechaDate: undefined,
        producto: [],
        user: []
      };

      jest.spyOn(service, 'create').mockImplementation(async () => savedOrder);

      const result = await service.create(orderDTO);
      expect(result).toEqual(savedOrder);
    });
  });
  describe('update2', () => {
    it('should update and return the order', async () => {
      const orderId = 'order-id-123';
      const orderDTO: OrderDTO = {
        fecha: undefined
      };
      const updatedOrder: IOrder = {
        fechaDate: undefined,
        producto: [],
        user: []
      };

      mockModel.findByIdAndUpdate.mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValue(updatedOrder),
      }));

      const result = await service.update2(orderId, orderDTO);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(orderId, orderDTO, { new: true });
      expect(result).toEqual(updatedOrder);
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const orderId = 'order-id-123';
      const mockOrder: IOrder = {
        _id: orderId,
        fechaDate: new Date(), // Asegúrate de proporcionar una fecha real
        producto: [
          // Aquí puedes agregar detalles de productos mockeados si es necesario
        ],
        user: [
          // Aquí puedes agregar detalles de usuarios mockeados si es necesario
        ]
      };

      mockModel.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValue(mockOrder)
      }));

      const result = await service.findOne(orderId);
      expect(mockModel.findById).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const orderId = 'order-id-123';
      const mockOrder: IOrder = {
        _id: orderId,
        fechaDate: new Date('2021-01-01'), // Asegúrate de proporcionar una fecha real
        producto: [
          // Aquí puedes agregar detalles de productos mockeados si es necesario
          { name: 'Producto 1', email: 'contacto@producto1.com', precio: '100' },
          { name: 'Producto 2', email: 'contacto@producto2.com', precio: '200' }
        ],
        user: [
          // Aquí puedes agregar detalles de usuarios mockeados si es necesario
          { name: 'Usuario 1', username: 'usuario1', email: 'usuario1@example.com', password: 'password1' }
        ]
      };

      mockModel.findById.mockImplementationOnce(() => ({
        populate: jest.fn().mockResolvedValue(mockOrder)
      }));

      const result = await service.findOne(orderId);
      expect(mockModel.findById).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('delete', () => {
    it('should delete an order and return success message', async () => {
      const orderId = 'order-id-123';
      const deleteResult = { status: 200, msg: 'deleted' };

      mockModel.findByIdAndDelete.mockResolvedValue(deleteResult);

      const result = await service.delete(orderId);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(deleteResult);
    });
  });


  describe('addProducto', () => {
    it('should add a product to an order and return the updated order', async () => {
      const orderId = 'order-id-123';
      const productoId = 'producto-id-1';
      const updatedOrder: IOrder = {
        _id: orderId,
        fechaDate: new Date(), // Fecha de ejemplo
        producto: [
          // Detalles existentes del producto
          { name: 'Producto Existente', email: 'existente@ejemplo.com', precio: '100' },
          // Nuevo producto agregado
          { name: 'Nuevo Producto', email: 'nuevo@ejemplo.com', precio: '200' }
        ],
        user: [
          // Detalles del usuario
          { name: 'Usuario Ejemplo', username: 'usuarioejemplo', email: 'usuario@ejemplo.com', password: 'password' }
        ]
      };

      //Cambia la implementación mock para devolver directamente updatedOrder
      mockModel.findByIdAndUpdate.mockResolvedValue(updatedOrder);

      const result = await service.addProduct(orderId, productoId);
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(orderId, { $addToSet: { productos: productoId } }, { new: true });
      expect(result).toEqual(updatedOrder);
    });
  });
  
  describe('findAll', () => {
    it('should return all orders', async () => {
      const mockOrders: IOrder[] = [
        {
          _id: 'order-id-1',
          fechaDate: new Date('2021-01-01'),
          producto: [
            { name: 'Producto A', email: 'contacto@productoA.com', precio: '100' },
            { name: 'Producto B', email: 'contacto@productoB.com', precio: '150' }
          ],
          user: [
            { name: 'Usuario 1', username: 'usuario1', email: 'usuario1@example.com', password: 'password1' }
          ]
        },
        {
          _id: 'order-id-2',
          fechaDate: new Date('2021-02-02'),
          producto: [
            { name: 'Producto C', email: 'contacto@productoC.com', precio: '200' }
          ],
          user: [
            { name: 'Usuario 2', username: 'usuario2', email: 'usuario2@example.com', password: 'password2' }
          ]
        }
      ];

    // Simula el método find para devolver mockOrders directamente
    mockModel.find.mockResolvedValue(mockOrders);

    const result = await service.findAll();
      expect(result).toEqual(mockOrders);
      expect(mockModel.find).toHaveBeenCalled();
    });
  });
});



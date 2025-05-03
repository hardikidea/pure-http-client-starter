import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { Context } from '../context/Context';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productService.listProducts();
    res.json(products);
  }

  static create(context: Context): ProductController {
    return new ProductController(context.productService);
  }

  static createNull(): ProductController {
    return new ProductController(ProductService.createNull());
  }
}

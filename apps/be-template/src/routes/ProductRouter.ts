import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Context } from '../context/Context';

export class ProductRouter {
  readonly router: Router;

  constructor(productController: ProductController, authMiddleware: AuthMiddleware) {
    this.router = Router();

    /**
     * @openapi
     * /products:
     *   get:
     *     tags:
     *       - Products
     *     summary: Get all products
     *     responses:
     *       200:
     *         description: Successful response
     */
    this.router.get(
      '/products',
      authMiddleware.authenticate.bind(authMiddleware),
      productController.getAllProducts.bind(productController)
    );
  }

  static create(context: Context): ProductRouter {
    return new ProductRouter(context.productController, context.authMiddleware);
  }

  static createNull(): ProductRouter {
    return new ProductRouter(ProductController.createNull(), AuthMiddleware.createNull());
  }
}

import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { OpenAPIGenerator, extendZodWithOpenApi } from 'zod-to-openapi';
import { z } from 'zod';

import { UserSchema } from '../shared/schemas/UserSchema';
import { ProductSchema } from '../shared/schemas/ProductSchema';

extendZodWithOpenApi(z); // extend Zod with OpenAPI metadata

export const setupSwagger = (app: Express): void => {
  const apiSchemas = {
    User: UserSchema.openapi({ title: 'User' }),
    Product: ProductSchema.openapi({ title: 'Product' })
  };

  const generator = new OpenAPIGenerator({
    openapi: {
      info: {
        title: 'Backend Template API',
        version: '1.0.0',
        description: 'Auto-generated OpenAPI from Zod'
      },
      openapi: '3.0.0',
      servers: [
        {
          url: 'http://localhost:4000/api'
        }
      ],
      paths: {
        '/users': {
          get: {
            summary: 'Get all users',
            tags: ['Users'],
            responses: {
              '200': {
                description: 'List of users',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            }
          }
        },
        '/products': {
          get: {
            summary: 'Get all products',
            tags: ['Products'],
            responses: {
              '200': {
                description: 'List of products',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Product' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          User: apiSchemas.User,
          Product: apiSchemas.Product
        }
      }
    }
  });

  const spec = generator.generateDocument();

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));
};

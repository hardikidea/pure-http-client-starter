import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from 'zod-to-openapi';
import { z } from 'zod';

import { UserSchema } from '../shared/schemas/UserSchema';
import { ProductSchema } from '../shared/schemas/ProductSchema';

extendZodWithOpenApi(z);

export const setupSwagger = (app: Express): void => {
  const registry = new OpenAPIRegistry();

  registry.register('User', UserSchema.openapi({ title: 'User' }));
  registry.register('Product', ProductSchema.openapi({ title: 'Product' }));

  registry.registerPath({
    method: 'get',
    path: '/users',
    tags: ['Users'],
    responses: {
      200: {
        description: 'List of users',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/products',
    tags: ['Products'],
    responses: {
      200: {
        description: 'List of products',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/Product' },
            },
          },
        },
      },
    },
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  const document = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Backend Template API',
      version: '1.0.0',
      description: 'Generated from Zod schemas',
    },
    servers: [{ url: 'http://localhost:4000/api' }],
  });

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(document));
  app.get('/api/docs.json', (_req, res) => res.json(document));
};

import userRoutes from './users/user.routes';
import productRoutes from './products/product.routes';
import categoryRoutes from './categories/category.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/categories', categoryRoutes);
};

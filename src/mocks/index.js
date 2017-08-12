import faker from 'faker';

import User from '../modules/users/user.model';
import Category from '../modules/categories/category.model';
import Product from '../modules/products/product.model';

const USERS_TOTAL = 3;
const CATEGORIES_TOTAL = 3;
const PRODUCTS_TOTAL = 3;

export default async () => {
  try {
    await User.remove();
    await Category.remove();
    await Product.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        name: faker.name.userName(),
        phone: faker.phone.phoneNumber(),
        role: 1,
      });
    })
  } catch (error) {
    throw(error);
  }
}

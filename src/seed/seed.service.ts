import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async executeSeed() {
    await this.insertNewProducts();

    return 'Seed executed successfully!';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises: Promise<
      | {
          images: string[];
          id: string;
          title: string;
          price: number;
          description: string;
          slug: string;
          stock: number;
          sizes: string[];
          gender: string;
          tags: string[];
        }
      | undefined
    >[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }
}

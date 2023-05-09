const faker = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.faker.datatype.uuid(),
        name: faker.faker.commerce.productName(),
        price: parseInt(faker.faker.commerce.price()),
        image: faker.faker.image.imageUrl(),
        isBlock: faker.faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
      // throw new Error("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return {
      message: "update",
      data: this.products[index]
    };
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
      // throw new Error("Product not found");
    }
    this.products.splice(index, 1);
    return {
      message: "Deleted",
      id: index
    };
  }
}

module.exports = ProductService;

export interface IProductInteractor {
  createProduct(input: any);
  updateStock(id: number, stock: number);
  getProduct(limit: number, offset: number);
}

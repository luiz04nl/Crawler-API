import ProductService from './ProductService'

export class ProductAplication {
  /**
   * Método construtor
   * @returns {void}
   * @public
   */
  constructor() {
    this.productService = new ProductService()
  }

  /**
   * Método que obtem os produtos
   * @public
   * @param {object} where - Filtro
   * @returns {Product[]}
   */
  async get(filter) {
    return this.productService.get(filter)
  }
}

export default ProductAplication

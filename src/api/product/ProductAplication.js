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
   * Método que obtem as produtos
   * @public
   * @param {object} where - Filtro
   * @returns {Product[]}
   */
  get(filter) {
    return this.productService.get(filter)
  }
}

export default ProductAplication

import cheerio from 'cheerio'
import MercadoLivrePage from './MercadoLivrePage'

export class ProductService {
  /**
   * Método construtor
   * @returns {void}
   * @public
   */
  constructor() {
    this.mercadoLivrePage = new MercadoLivrePage()
  }

  /**
   * Método que obtem as produtos
   * @public
   * @param {string} html - Html content
   * @param {number} limit - limite de resultados
   * @returns <Promise>{Product[]}
   */
  async transformPageContextToObject(html, limit) {
    const $ = cheerio.load(html)

    return await $('#searchResults > li')
      .map((_index, element) => {
        const item = cheerio.load(element)

        const name = cheerio.text(item('.main-title')).trim()
        const price = Number(
          cheerio.text(item('.price__fraction')).trim().split('.').join('')
        )
        const link = cheerio(item('.item__info-link'))['0'].attribs.href

        return {
          name,
          link,
          price,
          store: null,
          state: null,
        }
      })
      .toArray()
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .slice(0, limit || 10)
  }

  /**
   * Método que obtem as produtos
   * @public
   * @param {object} filter - Filtro
   * @returns <Promise>{Product[]}
   */
  async get(filter) {
    await this.mercadoLivrePage.launch()

    await this.mercadoLivrePage.gotToBaseUrl()

    await this.mercadoLivrePage.searchForProduct(filter.search)

    const html = await this.mercadoLivrePage.getPageContent()

    const results = this.transformPageContextToObject(html, filter.limit)

    await this.mercadoLivrePage.close()

    return results
  }
}

export default ProductService

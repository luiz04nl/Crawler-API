import puppeteer from 'puppeteer'

export class MercadoLivrePage {
  /**
   * Método construtor
   * @returns {void}
   * @public
   */
  constructor() {
    this.BASE_URL = 'https://www.mercadolivre.com.br'
  }

  /**
   * Inicia o browser chromium in headless mode
   * @public
   * @returns <Promise>{any}
   */
  async launch() {
    this.browser = await puppeteer.launch({
      headless: true,
      // headless: false
      args: ['--no-sandbox'],
    })

    this.page = await this.browser.newPage()
  }

  /**
   * Navegava para a página inicial
   * @public
   * @returns <Promise>{any}
   */
  async gotToBaseUrl() {
    await this.page.goto(this.BASE_URL)
  }

  /**
   * Buscar pordutos por nome
   * @public
   * @param {string} name - Nome do produto
   * @returns <Promise>{any}
   */
  async searchForProduct(name) {
    const searchInput = await this.page.waitForXPath(
      '/html/body/header/div/form/input'
    )
    await searchInput.click()
    await this.page.keyboard.sendCharacter(name)
    await searchInput.press('Enter')
    await this.page.waitForNavigation()
  }

  /**
   * Obter contúedo da página
   * @public
   * @returns <Promise>{any}
   */
  async getPageContent() {
    return await this.page.content()
  }

  /**
   * Fechar página
   * @public
   * @returns <Promise>{any}
   */
  async close() {
    return await this.browser.close()
  }
}

export default MercadoLivrePage

import MercadoLivrePage from './MercadoLivrePage'
// import puppeteer from 'puppeteer'

const mercadoLivrePage = new MercadoLivrePage()

const expectedBaseUrl = 'https://www.mercadolivre.com.br/'
const expectedSearchBaseUrl = 'https://lista.mercadolivre.com.br/'

// jest.mock('puppeteer')

beforeEach(async () => {
  await mercadoLivrePage.launch()
})

afterEach(async () => {
  await mercadoLivrePage.close()
})

/**
 * Procurar por produto
 * @public
 * @param {string} search - produto
 * @returns <Promise>{any}
 */
const searchForProduct = async (search) => {
  await mercadoLivrePage.gotToBaseUrl()
  await mercadoLivrePage.searchForProduct(search)
}

describe('Mercado Livre Page Object', () => {
  test('Deve iniciar o browser chromium in headless mode', async () => {
    expect(mercadoLivrePage.browser).not.toBe(undefined)
    expect(mercadoLivrePage.page).not.toBe(undefined)
  })
  test('Deve navegavar para a página inicial', async () => {
    await mercadoLivrePage.gotToBaseUrl()
    const currentUrl = mercadoLivrePage.page.url()
    expect(currentUrl).toBe(expectedBaseUrl)
  })
  test('Deve buscar produtos por nome', async () => {
    const search = 'ps4'
    await searchForProduct(search)
    const currentUrl = mercadoLivrePage.page.url()
    expect(currentUrl).toBe(expectedSearchBaseUrl + search)
  })
  test('Deve obter conteúdo da página', async () => {
    const search = 'ps4'
    await searchForProduct(search)
    const html = await mercadoLivrePage.getPageContent()
    expect(html).not.toBe(undefined)
  })
})

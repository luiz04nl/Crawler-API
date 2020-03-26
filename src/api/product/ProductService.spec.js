import ProductService from './ProductService'
import { productsDump } from './products.dump'

const productService = new ProductService()

import path from 'path'
import fs from 'fs'

jest.mock('./MercadoLivrePage')

const mockHtmlPage = String(
  fs.readFileSync(path.join(__dirname, './mercado-livre-page.dump.html'))
)
const mockProducts = productsDump

beforeEach(() => {})

afterEach(() => {})

describe('Serviço de Produtos', () => {
  test('Deve transformar o html da página de produtos em um array de produtos', async () => {
    const limit = 5
    const products = await productService.transformPageContextToObject(
      mockHtmlPage,
      limit
    )

    expect(products).toStrictEqual(mockProducts)
  })
  test('Deve obter os produtos', async () => {
    const filter = {
      search: 'ps4 pro',
      limit: 5,
    }
    productService.mercadoLivrePage.getPageContent.mockReturnValue(mockHtmlPage)
    const products = await productService.get(filter)

    expect(products).toStrictEqual(mockProducts)
  })
})

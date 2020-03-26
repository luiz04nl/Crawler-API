import ProductAplication from './ProductAplication'
import { productsDump } from './products.dump'

const productAplication = new ProductAplication()

jest.mock('./ProductService')

const mockProducts = productsDump

beforeEach(() => {})

afterEach(() => {})

describe('Aplicação de Produtos', () => {
  test('Deve obter os produtos', async () => {
    const filter = {
      search: 'ps4 pro',
      limit: 5,
    }

    productAplication.productService.get.mockReturnValue(mockProducts)

    const products = await productAplication.get(filter)

    expect(products).toStrictEqual(mockProducts)
  })
})

import ProductAplication from './ProductAplication'

const ProductRoutes = (route) => {
  route.post('/api/product', async (req, res) => {
    return new ProductAplication()
      .get(req.body)
      .then((success) => {
        res.api.send(success, res.api.codes.OK)
      })
      .catch((err) => {
        console.log('LUIZ err', err)
        res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
      })
  })
}

export default ProductRoutes

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'
import ProductAdditional from 'App/Models/ProductAdditional'

export default class ProductAdditionalsController {
  public async index({ response }) {
    const productsAdditionals = await ProductAdditional.query()
      .preload('product')
      .preload('additional')

    response.status(200)

    return productsAdditionals
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const productsAdditionals = await ProductAdditional.find(id)

    response.status(200)

    return productsAdditionals
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    if (!(await Product.find(body.product_id))) {
      response.json({
        message: 'Produto não encontrado',
      })
      response.status(404)
    } else {
      const productAdditional = await ProductAdditional.create(body)

      response.status(201)

      return {
        message: 'Produto adicionais criado com sucesso',
        data: productAdditional,
      }
    }
  }
}

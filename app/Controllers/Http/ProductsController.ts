import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from '../../Models/Product'

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const product = await Product.all()

    response.status(200)

    return product
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const product = await Product.find(id)

    response.status(200)

    return product
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const product = await Product.create(body)

    response.status(201)

    return {
      message: 'Produto criado com sucesso',
      data: product,
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { id } = params
    const body = request.body()

    const product = await Product.findOrFail(id)

    product.name = body.name
    product.price = body.price

    await product.save()

    response.status(200)

    return {
      message: 'Produto atualizado com sucesso',
      data: product,
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    const product = await Product.findOrFail(id)

    await product.delete()

    response.status(200)

    return {
      message: 'Produto excluído com sucesso',
    }
  }
}

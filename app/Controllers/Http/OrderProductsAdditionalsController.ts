import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OrderProductAdditionals from '../../Models/OrderProductAdditionals'

export default class OrderProductsAdditionalsController {
  public async index({ response }: HttpContextContract) {
    const orderProductAdditionals = await OrderProductAdditionals.query()
      .preload('order')
      .preload('productAdditional', (query) => query.preload('additional').preload('product'))

    response.status(200)

    return orderProductAdditionals
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const orderProductAdditionals = await OrderProductAdditionals.findOrFail(id)

    // await orderProductAdditionals.load('order')
    await orderProductAdditionals.load('productAdditional', (query) =>
      query.preload('additional').preload('product')
    )

    response.status(200)

    return orderProductAdditionals
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const orderProductAdditionals = await OrderProductAdditionals.create(body)

    response.status(201)

    return {
      message: 'Pedido_Produto criado com sucesso',
      data: orderProductAdditionals,
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { id } = params
    const body = request.body()

    const orderProductAdditionals = await OrderProductAdditionals.findOrFail(id)

    orderProductAdditionals.orderId = body.order_id
    orderProductAdditionals.productAdditionalId = body.product_additionals_id

    await orderProductAdditionals.save()

    response.status(200)

    return {
      message: 'Pedido_Produto atualizado com sucesso',
      data: orderProductAdditionals,
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    const orderProductAdditionals = await OrderProductAdditionals.findOrFail(id)

    await orderProductAdditionals.delete()

    response.status(200)

    return {
      message: 'Pedido_Produto excluído com sucesso',
    }
  }
}

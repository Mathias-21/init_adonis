import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from '../../Models/Order'

export default class OrdersController {
  public async index({ response }: HttpContextContract) {
    const order = await Order.query().preload('orderProductAdditionals', (query) =>
      query.preload('productAdditional', (query) => query.preload('product').preload('additional'))
    )

    const orderJSON = order.map((order) => order.serialize())

    response.status(200)

    return orderJSON
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const order = await Order.findOrFail(id)

    await order.load('orderProductAdditionals', (query) =>
      query.preload('productAdditional', (query) => query.preload('product').preload('additional'))
    )

    const orderJSON = order.serialize()

    response.status(200)

    return orderJSON
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const order = await Order.create(body)

    response.status(201)

    return {
      message: 'Pedido criado com sucesso',
      data: order,
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { id } = params
    const body = request.body()

    const order = await Order.findOrFail(id)

    order.description = body.description
    order.status = body.status

    await order.save()

    response.status(200)

    return {
      message: 'Pedido atualizado com sucesso',
      data: order,
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    const order = await Order.findOrFail(id)

    await order.delete()

    response.status(200)

    return {
      message: 'Pedido excluído com sucesso',
    }
  }
}

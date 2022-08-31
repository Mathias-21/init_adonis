import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from '../../Models/Order'

export default class OrdersController {
  public async index({ response }: HttpContextContract) {
    const order = await Order.query().preload('orderProductAdditionals', (query) =>
      query.preload('productAdditional', (query) => query.preload('additional').preload('product'))
    )

    const orderJSON = order.map((order) =>
      order.serialize({
        fields: {
          omit: ['created_at', 'updated_at'],
        },
        relations: {
          orderProductAdditionals: {
            fields: {
              omit: ['order_id', 'created_at', 'updated_at', 'product_additional_id', 'id'],
            },
            relations: {
              productAdditional: {
                fields: {
                  omit: ['id', 'product_id', 'additional_id', 'created_at', 'updated_at'],
                },
                relations: {
                  product: {
                    fields: {
                      omit: ['created_at', 'updated_at'],
                    },
                  },
                  additional: {
                    fields: {
                      omit: ['created_at', 'updated_at'],
                    },
                  },
                },
              },
            },
          },
        },
      })
    )

    response.status(200)

    return orderJSON
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const order = await Order.findOrFail(id)

    await order.load('orderProductAdditionals', (query) =>
      query.preload('productAdditional', (query) => query.preload('product').preload('additional'))
    )

    const orderJSON = order.serialize({
      fields: {
        omit: ['created_at', 'updated_at'],
      },
      relations: {
        orderProductAdditionals: {
          fields: {
            omit: ['order_id', 'created_at', 'updated_at', 'product_additional_id', 'id'],
          },
          relations: {
            productAdditional: {
              fields: {
                omit: ['id', 'product_id', 'additional_id', 'created_at', 'updated_at'],
              },
              relations: {
                product: {
                  fields: {
                    omit: ['id', 'created_at', 'updated_at'],
                  },
                },
                additional: {
                  fields: {
                    omit: ['id', 'created_at', 'updated_at'],
                  },
                },
              },
            },
          },
        },
      },
    })

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

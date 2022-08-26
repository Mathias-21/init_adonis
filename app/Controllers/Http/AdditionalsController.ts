import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Additional from '../../Models/Additional'

export default class AdditionalsController {
  public async index({ response }: HttpContextContract) {
    const additional = await Additional.all()

    response.status(200)

    return additional
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const additional = await Additional.find(id)

    response.status(200)

    return additional
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const additional = await Additional.create(body)

    response.status(201)

    return {
      message: 'Adicional criado com sucesso',
      data: additional,
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    const { id } = params
    const body = request.body()

    const additional = await Additional.findOrFail(id)

    additional.name = body.name
    additional.price = body.price

    await additional.save()

    response.status(200)

    return {
      message: 'Adicional atualizado com sucesso',
      data: additional,
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    const additional = await Additional.findOrFail(id)

    await additional.delete()

    response.status(200)

    return {
      message: 'Adicional excluído com sucesso',
    }
  }
}

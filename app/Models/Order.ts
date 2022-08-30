import ProductAdditional from './ProductAdditional'
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import OrderProductAdditionals from './OrderProductAdditionals'

export default class Order extends BaseModel {
  @hasMany(() => OrderProductAdditionals)
  public orderProductAdditionals: HasMany<typeof OrderProductAdditionals>

  @hasMany(() => ProductAdditional)
  public productsAdditionals: HasMany<typeof ProductAdditional>

  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

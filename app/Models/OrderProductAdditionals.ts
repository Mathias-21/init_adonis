import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import ProductAdditional from './ProductAdditional'

export default class OrderProductAdditionals extends BaseModel {
  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>

  @belongsTo(() => ProductAdditional)
  public productAdditional: BelongsTo<typeof ProductAdditional>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'order_id' })
  public orderId: number

  @column({ columnName: 'product_additionals_id' })
  public productAdditionalId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

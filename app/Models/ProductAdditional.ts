import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Additional from './Additional'
import Product from './Product'
import OrderProductAdditionals from './OrderProductAdditionals'

export default class ProductAdditional extends BaseModel {
  @belongsTo(() => Additional)
  public additional: BelongsTo<typeof Additional>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @hasOne(() => OrderProductAdditionals)
  public orderProductAdditionals: HasOne<typeof OrderProductAdditionals>

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'product_id' })
  public productId: number

  @column({ columnName: 'additional_id' })
  public additionalId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

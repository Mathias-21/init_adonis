import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Additional from './Additional'
import Product from './Product'

export default class ProductAdditional extends BaseModel {
  @hasOne(() => Additional)
  public additional: HasOne<typeof Additional>

  @hasOne(() => Product)
  public product: HasOne<typeof Product>

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

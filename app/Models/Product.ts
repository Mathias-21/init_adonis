import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductAdditional from './ProductAdditional'
export default class Product extends BaseModel {
  @hasOne(() => ProductAdditional)
  public productAdditionalsId: HasOne<typeof ProductAdditional>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

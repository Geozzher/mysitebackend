import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class Article extends Model {
  @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: false})
  id!: string

  @Column({primaryKey: true, type: DataType.STRING})
  title!: string

  @Column({type: DataType.STRING})
  introduce!: string

  @Column({type: DataType.STRING})
  types!: string

  @Column({type: DataType.STRING})
  tags!: string

  @Column({type: DataType.STRING})
  cover!: string

  @Column({type: DataType.TEXT})
  content!: string

  @Column({type: DataType.TEXT})
  content_html!: string

  @Column({type: DataType.NUMBER})
  visited_counts!: string

  @Column({type: DataType.NUMBER})
  liked_counts!: string

  @Column({type: DataType.BOOLEAN})
  is_show!: boolean
}

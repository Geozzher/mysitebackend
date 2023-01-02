import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class Recommend extends Model {
  @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: false})
  id!: string

  @Column({type: DataType.STRING})
  title!: string

  @Column({type: DataType.STRING})
  goto_text!: string

  @Column({type: DataType.STRING})
  goto_url!: string

  @Column({type: DataType.STRING})
  description!: string
}

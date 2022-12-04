import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class Tag extends Model {
  @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: false})
  id!: string

  @Column({type: DataType.STRING})
  name!: string

  @Column({type: DataType.STRING})
  label!: string

  @Column({type: DataType.STRING})
  color!: string

  @Column({type: DataType.STRING})
  is_show!: string

}

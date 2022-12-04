import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class User extends Model {
  @Column({primaryKey: true, type: DataType.INTEGER, autoIncrement: false})
  id!: string

  @Column({primaryKey: true, type: DataType.STRING})
  username!: string

  @Column({type: DataType.TEXT})
  password!: string

  @Column({type: DataType.CHAR})
  sex!: string

  @Column({type: DataType.STRING})
  email!: string

  @Column({type: DataType.STRING})
  role!: string

  @Column({type: DataType.STRING})
  permission!: string

  @Column({type: DataType.NUMBER})
  mobile!: string

  @Column({type: DataType.STRING})
  description!: string
}

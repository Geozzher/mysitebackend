import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class Statistic extends Model {
  @Column({primaryKey: true, type: DataType.STRING})
  id!: string

  @Column({type: DataType.INTEGER})
  m00001!: string

  @Column({type: DataType.INTEGER})
  m00002!: string

  @Column({type: DataType.INTEGER})
  m00003!: string

  @Column({type: DataType.INTEGER})
  m00004!: string

  @Column({type: DataType.INTEGER})
  m00005!: string

  @Column({type: DataType.INTEGER})
  m00006!: string

  @Column({type: DataType.INTEGER})
  m00007!: string

  @Column({type: DataType.INTEGER})
  m00008!: string

  @Column({type: DataType.INTEGER})
  m00009!: string

  @Column({type: DataType.INTEGER})
  m000010!: string

  @Column({type: DataType.INTEGER})
  m000011!: string

  @Column({type: DataType.INTEGER})
  m000012!: string
}

import Statistic from "../model/Statistic";
import {getDate} from "../../utils/dateTime";
import sequelize  from "sequelize";
import {tracertMap} from "../constant/tracertsMap";

class StatisticService {

  createOne(id: string, field: string) {
    return Statistic.create({id, [field]: 0})
  }

  update(id: string, field: string) {
    return Statistic.update({[field]: sequelize.literal(`${field}+1`)}, {
      where: {id}
    })
  }

  /**
   * 更新指定的访问量
   */
  async updateViewCounts(field: string) {
    // @ts-ignore
    const dbField = tracertMap[field];
    if (!dbField) return [0];
    const id = getDate();
    console.log('===id', id)
    const [affectRows] = await this.update(id, dbField)
    if (affectRows) {
      return [affectRows]
    }

    await this.createOne(id, dbField);
    return this.update(id, dbField)
  }
}

export default new StatisticService();

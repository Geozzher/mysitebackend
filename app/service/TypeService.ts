import Type from "../model/Type";
import { getTimeStamps } from "../../utils/dateTime";
import {WhereOptions} from "sequelize";
import Tag from "../model/Tag";

class TypeService {
  /**
   * 获取文章类型
   */
  getForFront(params?: WhereOptions) {
    return Type.findAll({
      attributes: ["id", "name", "label", "color"],
      where: {...params, is_show: true}
    });
  }

  /**
   * 获取标签
   */
  getForBackend(current?: number, pageSize?: number, params?: WhereOptions) {
    if(!current || !pageSize) {return Type.findAll()}
    // @ts-ignore
    return Type.findAll({
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: params || {},
    });
  }

  /**
   * 获取类型数量
   */
  countRecords(params?: WhereOptions) {
    return Type.count({
      where: params || {},
    });
  }
  /**
   * 增加文章类型
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  addType(name: string, label: string, color: string, is_show: boolean) {
    // const id = getTimeStamps();
    return Type.create({ name, label, color, is_show });
  }

  /**
   * 修改文章类型
   * @param id
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  setType(
    id: string,
    name: string,
    label: string,
    color: string,
    is_show: boolean
  ) {
    return Type.update({ name, label, color, is_show }, { where: { id } });
  }
}

export default new TypeService();

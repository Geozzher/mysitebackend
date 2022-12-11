import Tag from "../model/Tag";
import {getTimeStamps} from "../../utils/dateTime";
import {WhereOptions} from "sequelize";

class TagService {
  /**
   * 前台获取标签
   */
  getForFront(params?: WhereOptions) {
    return Tag.findAll({
      attributes: ["id", "name", "label", "color"],
      where: {...params, is_show: true}
    });
  }

  /**
   * 获取标签
   */
  getForBackend(current: number, pageSize: number, params?: WhereOptions) {
    return Tag.findAll({
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: params || {},
    });
  }

  /**
   * 获取标签数量
   */
  countRecords(params?: WhereOptions) {
    return Tag.count({
      where: params || {},
    });
  }

  /**
   * 增加标签
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  addTag(name: string, label: string, color: string, is_show: boolean) {
    const id = getTimeStamps();
    return Tag.create({
      id,
      name,
      label,
      color,
      is_show,
    });
  }

  /**
   * 修改头部导航链接
   * @param id
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  setTag(
    id: string,
    name: string,
    label: string,
    color: string,
    is_show: boolean
  ) {
    return Tag.update(
      {
        name,
        label,
        color,
        is_show,
      },
      {where: {id}}
    );
  }
}

export default new TagService();

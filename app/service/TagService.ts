import Tag from "../model/Tag";
import {getTimeStamps} from "../../utils/dateTime";

class TagService {
  /**
   * 获取标签
   */
  get() {
    return Tag.findAll({attributes: ['id', 'name', 'label', 'color']})
  }

  /**
   * 增加标签
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  addTag(name: string, label: string, color: string, is_show: string) {
    const id = getTimeStamps()
    return Tag.create({
      id, name, label, color, is_show
    })
  }

  /**
   * 修改头部导航链接
   * @param id
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  setTag(id: string, name: string, label: string, color: string, is_show: string) {
    return Tag.update({
      name, label, color, is_show
    }, {where: {id}})
  }
}

export default new TagService

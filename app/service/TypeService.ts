import Type from "../model/Type";
import {getTimeStamps} from "../../utils/dateTime";

class TypeService {
  /**
   * 获取文章类型
   */
  get() {
    return Type.findAll({attributes: ['id', 'name', 'label', 'color']})
  }

  /**
   * 增加文章类型
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  addType(name: string, label: string, color: string, is_show: string) {
    const id = getTimeStamps()
    return Type.create({
      id, name, label, color, is_show
    })
  }

  /**
   * 修改文章类型
   * @param id
   * @param name
   * @param label
   * @param color
   * @param is_show
   */
  setType(id: string, name: string, label: string, color: string, is_show: string) {
    return Type.update({
      name, label, color, is_show
    }, {where: {id}})
  }
}

export default new TypeService

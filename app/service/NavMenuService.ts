import NavMenu from "../model/NavMenu";
import {getTimeStamps} from "../../utils/dateTime";

class NavMenuService {
  /**
   * 获取头部导航菜单
   */
  get() {
    return NavMenu.findAll({attributes: ['id', 'name', 'label', 'path']})
  }

  /**
   * 增加头部导航链接
   * @param name
   * @param label
   * @param path
   * @param is_show
   */
  addNavMenu(name: string, label: string, path: string, is_show: string) {
    const id = getTimeStamps()
    return NavMenu.create({
      id, name, label, path, is_show
    })
  }

  /**
   * 修改头部导航链接
   * @param id
   * @param name
   * @param label
   * @param path
   * @param is_show
   */
  setNavMenu(id: string, name: string, label: string, path: string, is_show: string) {
    return NavMenu.update({
      name, label, path, is_show
    }, {where: {id}})
  }
}

export default new NavMenuService

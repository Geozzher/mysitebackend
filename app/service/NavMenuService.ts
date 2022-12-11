import NavMenu from "../model/NavMenu";
import {getTimeStamps} from "../../utils/dateTime";
import {WhereOptions} from "sequelize";
import Type from "../model/Type";

class NavMenuService {
  /**
   * 获取部导航菜单
   */
  getForFront() {
    return NavMenu.findAll({attributes: ["id", "name", "label", "path"], where: {is_show: true}});
  }

  /**
   * 获取头部导航菜单
   */
  getForBackend(current: number, pageSize: number, params?: WhereOptions) {
    return NavMenu.findAll({
      offset: (current - 1) * pageSize,
      limit: pageSize,
      where: params || {},
    });
  }

  countRecords(params?: WhereOptions) {
    return NavMenu.count({
      where: params || {},
    });
  }

  /**
   * 增加头部导航链接
   * @param name
   * @param label
   * @param path
   * @param is_show
   */
  addNavMenu(name: string, label: string, path: string, is_show: boolean) {
    const id = getTimeStamps();
    return NavMenu.create({
      id,
      name,
      label,
      path,
      is_show,
    });
  }

  /**
   * 修改头部导航链接
   * @param id
   * @param name
   * @param label
   * @param path
   * @param is_show
   */
  setNavMenu(
    id: string,
    name: string,
    label: string,
    path: string,
    is_show: boolean
  ) {
    return NavMenu.update(
      {
        name,
        label,
        path,
        is_show,
      },
      {where: {id}}
    );
  }
}

export default new NavMenuService();

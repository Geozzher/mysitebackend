import User from "../model/User";

class UserService {
  getUserById(uid: number) {
    return User.findByPk(uid)
  }

  getUserListByPage(currentPage: number = 1, pageSize: number = 15) {
    return User.findAndCountAll({
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    })
  }

  getUserByName(name: string) {
    return User.findOne({
      where: {username: name}
    })
  }

  createUser(id: number, username: string, password: string, description: string, email: string, permission: string) {
    return User.create({
      id: id,
      username: username,
      password: password,
      description: description,
      email: email,
      permission: permission
    })
  }

  updateUser(id: number, username: string, password: string, description: string, email: string, permission: string) {
    return User.update({
      username: username,
      password: password,
      description: description,
      email: email,
      permission: permission
    }, {
      where: {id: id}
    })
  }

  deleteUserById(id: number) {
    return User.destroy({
      where: {id: id}
    })
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const userPermission = await User.findOne({
      attributes: ["permission"],
      where: {
        userId
      }
    })

    return userPermission == null ? [] : userPermission["permission"].split(',')
  }
}

export default new UserService

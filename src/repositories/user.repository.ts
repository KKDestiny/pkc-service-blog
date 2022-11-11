/*
 * @Date: 2022-10-05 22:40:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import UserModel from "../models/users.model";
import { UserType } from "../interfaces/user.interface";

class UserRepository extends BaseRepository<UserType> {}

export default new UserRepository(UserModel);

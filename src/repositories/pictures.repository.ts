/*
 * @Date: 2022-10-06 22:40:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import PictureModel from "../models/picture.model";

import { PictureType } from "../interfaces/picture.interface";

class Repository extends BaseRepository<PictureType> {}

export default new Repository(PictureModel);

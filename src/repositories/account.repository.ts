/*
 * @Date: 2020-06-09 15:24:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { omitBy, isUndefined } from "lodash";
import accountModel from "../models/account.model";

import { IAccount } from "../interfaces/account.interface";
import { repoOptions } from "../interfaces/comm.interface";
class AccountRepository {
  private model;

  constructor(model) {
    this.model = model;
  }

  async create(data: IAccount): Promise<IAccount> {
    return await this.model.create(data);
  }

  async updateById(_id: string, data: any): Promise<IAccount> {
    return await this.model
      .findByIdAndUpdate({ _id }, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  async read(criteria): Promise<IAccount> {
    return await this.model.findOne(criteria);
  }

  async remove(data): Promise<null> {
    return await this.model.findOneAndDelete(data);
  }

  async list(options: repoOptions): Promise<[IAccount]> {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 100;
    const select = options.select || "";
    const condition = omitBy(criteria, isUndefined);

    return await this.model
      .find(condition)
      .select(select)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(limit * page)
      .lean()
      .exec();
  }

  load(options: repoOptions): Promise<IAccount> {
    const criteria = options.criteria || {};
    const result = omitBy(criteria, isUndefined);
    const select = options.select || "";
    return this.model.findOne(result).select(select).lean().exec();
  }
}

export default new AccountRepository(accountModel);

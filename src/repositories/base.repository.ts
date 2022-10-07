import { omitBy, isUndefined } from "lodash";

import { repoOptions } from "../interfaces/comm.interface";

export class BaseRepository<T> {
  private model;

  constructor(model) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    return await this.model.create(data);
  }

  async updateById(_id: string, data: any): Promise<T> {
    return await this.model
      .findByIdAndUpdate({ _id }, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  async findByIdAndUpdate(criteria, data: any): Promise<T> {
    return await this.model
      .findByIdAndUpdate(criteria, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  async count(criteria): Promise<T> {
    return await this.model.count(criteria);
  }

  async read(criteria): Promise<T> {
    return await this.model.findOne(criteria);
  }

  async remove(data): Promise<null> {
    return await this.model.findOneAndDelete(data);
  }

  async list(options?: repoOptions): Promise<[T]> {
    if (!options) options = {};
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 1000000;
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

  load(options: repoOptions): Promise<T> {
    const criteria = options.criteria || {};
    const result = omitBy(criteria, isUndefined);
    const select = options.select || "";
    return this.model.findOne(result).select(select).lean().exec();
  }
}

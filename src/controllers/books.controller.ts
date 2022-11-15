/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { IRequest } from "../interfaces/comm.interface";
import { UserType } from "../interfaces/user.interface";

import userRepo from "../repositories/user.repository";

import { generateSerial, getDatetime1 } from "../utils/string.util";

/**
 * 获取书籍列表
 */
async function getBooks(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const collections = (user.collections || []).reduce((temp, item) => {
      if (item.status === "deleted") return temp;
      temp.push(item);
      return temp;
    }, []);

    return res.status(200).json({
      data: collections,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 新建一本书籍
 */
async function createABook(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const { parent, name, intro } = req.body;
    if (!name) return res.status(400).json({ errors: "name is required" });

    const book = {
      id: `private_${generateSerial()}`,
      parent,
      name,
      intro,
      date: getDatetime1(),
      lastdate: getDatetime1(),
    };

    const result = await userRepo.findOneAndUpdate({ _id: user._id }, { $addToSet: { collections: book } });
    if (!result) {
      return res.status(400).json({ errors: "create failed" });
    }

    return res.status(200).json({
      data: book,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 删除一本书籍
 */
async function deleteABook(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const { bookId } = req.params;
    if (!bookId) return res.status(400).json({ errors: "bookId is required" });

    const result = await userRepo.findOneAndUpdate({ _id: user._id }, { $pull: { collections: { id: bookId } } });
    if (!result) {
      return res.status(400).json({ errors: "create failed" });
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 更新一本书籍
 */
async function updateABook(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const { bookId } = req.params;
    if (!bookId) return res.status(400).json({ errors: "bookId is required" });

    const { name, intro } = req.body;
    if (!name) return res.status(400).json({ errors: "name is required" });

    const result = await userRepo.updateOne(
      { _id: user._id, collections: { $elemMatch: { id: bookId } } },
      {
        $set: {
          "collections.$.name": name,
          "collections.$.intro": intro,
          "collections.$.lastdate": getDatetime1(),
        },
      }
    );
    if (!result) {
      return res.status(400).json({ errors: "update failed" });
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 移动一本书籍
 */
async function moveABook(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const { bookId } = req.params;
    if (!bookId) return res.status(400).json({ errors: "bookId is required" });

    const { parent } = req.body;
    if (!parent) return res.status(400).json({ errors: "parent is required" });

    const result = await userRepo.updateOne(
      { _id: user._id, collections: { $elemMatch: { id: bookId } } },
      {
        $set: {
          "collections.$.parent": parent,
        },
      }
    );
    if (!result) {
      return res.status(400).json({ errors: "move failed" });
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getBooks,
  createABook,
  deleteABook,
  updateABook,
  moveABook,
};

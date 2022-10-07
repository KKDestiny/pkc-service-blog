/*
 * @Date: 2022-10-05 22:40:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import ArticleModel from "../models/articles.model";
import { ArticleType } from "../interfaces/article.interface";

class ArticleRepository extends BaseRepository<ArticleType> {}

export default new ArticleRepository(ArticleModel);

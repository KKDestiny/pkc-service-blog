/* eslint-disable camelcase */
/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */

import { MongoId } from "./comm.interface";

/**
 * 投稿记录
 */
export type PublishLogType = {
  date: string;
  categorieid: string;
  operator: string;
  exinfo: string;
  result: string;
};
/**
 * 发布记录
 */
export type ReleaseLogType = {
  id: string;
  date: string;
  version: string;
  releasedversion: string;
  content: string;
};
/**
 * 交接记录
 */
export type TakeoverType = {
  id: string;
  date: string;
  author: string;
  newauthor: string;
  exinfo: string;
  operator: string;
};

/**
 * 评论
 */
export type CommentType = {
  id: string;
  date: string;
  name: string;
  type: string;
  content: string;
  content_type: string;
  headimg: string;
  ref_id: string;
  isguest: string;
};

/**
 * 历史版本
 */
export type HistoryType = {
  _id: string;
  date: string;
  version: string;
  devicetype: string;
  savetype: string;
};

/**
 * 附件
 */
export type AttachmentType = {
  id: string;
  name: string;
  private: string;
  realname: string;
};

export type ArticleType = {
  date?: string;
  title?: string;
  abstract?: string;
  author?: string;
  login?: string;
  author_url?: string;
  editor?: string;
  status?: string;
  ispublished?: string;
  categorieid?: string;
  publishto?: string;
  publishtologs?: Array<PublishLogType>;
  original?: string;
  tag?: string;
  settop?: string;

  links?: Array<string>;
  like?: Array<string>;
  reader?: Array<string>;

  likenum?: number;
  readnum?: number;
  words?: number;

  isTemplate?: boolean;

  url?: string;
  img_url?: string;
  version?: string;

  releasedversion?: string;
  releasedversionName?: string;
  release_log?: Array<ReleaseLogType>;

  firstauthor?: string;

  takeover?: Array<TakeoverType>;

  date_release?: Date;
  date_delete?: Date;
  date_publish?: Date;

  comment?: Array<CommentType>;
  history?: Array<HistoryType>;
  attachment?: Array<AttachmentType>;

  private_categorieid?: string;
  isencrypted?: boolean;
  passwd?: string;
  allow_reader?: Array<MongoId>;
  allow_group?: Array<MongoId>;
};

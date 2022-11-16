/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */

type ReflogType = {
  date: string;
  author: string;
  title: string;
};

export type PictureType = {
  _id?: string;
  name: string;
  sha1: string;
  size: number;

  author: string;
  status: string;
  refLog?: Array<ReflogType>;
};

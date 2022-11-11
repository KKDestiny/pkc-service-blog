/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */

export type CollectionType = {
  id: string;
  name: string;
  intro: string;
  preface?: string;
  lastdate: string;
  parent?: string;
  status?: string;
};

export type UserType = {
  name?: string;
  login?: string;
  collections?: Array<CollectionType>;
};

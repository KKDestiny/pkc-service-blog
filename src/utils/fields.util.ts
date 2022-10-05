/*
 * @Date: 2020-06-11 14:11:50
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
/**
 * 检查source的path路径是否合法
 * @param {*} source 数据对象
 * @param {*} path 该数据对象的路径，仅支持以英文句号 dot-notation 来分割
 * --------------------------------
 * @example
 * let source = {
 *  salesIndex: {
 *    supplyArea: {
 *      2019: [],
 *    }
 *  }
 * };
 * let path1 = "salesIndex.supplyArea.2019";
 * checkPathValid(source, path1); // true
 *
 * let path2 = "salesIndex.supplyArea.2020";
 * checkPathValid(source, path2); // false
 *
 * let path2 = "salesIndex.other.2019";
 * checkPathValid(source, path2); // false
 */
export const checkPathValid = (source, path) => {
  if (!source) {
    return false;
  }
  if (!path) {
    return false;
  }
  const keyQueue = path.split(".");
  let obj = source;
  for (const key of keyQueue) {
    obj = obj[key];
    if (undefined === obj) {
      return false;
    }
  }
  return true;
};

/**
 * 检查对象中是否有有效key
 * @param {*} obj 对象
 */
export const hasValidKey = obj => {
  if (!obj) {
    return false;
  }

  for (const key in obj) {
    return true;
  }

  return false;
};

/**
 * 获取path下的数值
 * @param {*} source 原始对象
 * @param {*} path 构建路径
 * @param {Boolean} strict 如果为 true，路径不存在时返回undefined而不是空对象
 */
export const getValueByPath = (src = {}, path = "", strict) => {
  const source = src === null ? {} : src;
  const keys = path.split(".");
  let result = source;
  for (const key of keys) {
    if (result[key] === undefined) {
      return strict ? undefined : {};
    }
    result = result[key];
  }
  return result;
};

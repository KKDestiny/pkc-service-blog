export const simpleFieldsArticle = {
  title: 1,
  date: 1,
  date_release: 1,
  releasedversionName: 1,
  status: 1,
  version: 1,
  categorieid: 1,
  editor: 1,
  tag: 1,
  private_categorieid: 1,
  abstract: 1,
  releasedversion: 1,
  isencrypted: 1,
  ispublished: 1,
  date_delete: 1,

  createdAt: 1,
  updatedAt: 1,
  isBoardMode: 1,

  history: { $slice: -1 }, // 取最后一个
  release_log: { $slice: -1 }, // 取最后一个
};

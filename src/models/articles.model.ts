/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";
import { saveTypes } from "../config/constants";

export const schema = new Schema(
  {
    title: {
      type: String,
      description: "文章标题",
    },
    abstract: {
      type: String,
      description: "文章摘要。写入前必须转为纯文字",
    },
    originalArticleId: {
      type: Schema.Types.ObjectId,
      description: "原始文章id",
    },
    author: {
      type: String,
      description: "文章作者",
    },
    login: {
      type: String,
      description: "文章作者(统一账户)",
    },
    author_url: {
      type: String,
      description: "作者头像url",
    },
    editor: {
      type: String,
      enum: ["markdown", "richtext", "html"],
      description: `编辑器类型，默认为Markdown，还可以有 HTML编辑器-"html" 和 富文本编辑器-"richtext"`,
    },
    status: {
      // released(发布) | saved(保存、未发布) | deleted(删除,并未真正删除)
      type: String,
      enum: ["released", "saved", "deleted"],
      description: "状态",
    },
    ispublished: {
      type: String,
      description: `是否被收录。此字段在文章创建时候默认为"no"，在文章被收录时候置为 “yes”；如果用户撤稿，此字段需重置为“no”`,
    },
    categorieid: {
      type: String,
      description: "所属模块。默认为 default。具体id参照config/article.js里的定义",
    },
    private_categorieid: {
      type: String,
      description: "私人文集， 默认为 default",
    },
    publishto: {
      type: String,
      description: "创建文章时置为“default”。向某一专题投稿。 最终写入 categorieid",
    },
    words: {
      type: Number,
      description: "文章字数",
    },
    publishtologs: {
      type: [
        {
          date: { type: String, description: "投稿日期" },
          categorieid: { type: String, description: "目标文集id" },
          operator: { type: String, description: "操作者" },
          exinfo: { type: String, description: "信息" },
          result: { type: String, description: "结果", enum: ["confused", "canceled", "accepted"] },
        },
      ],
      description: "向某一专题投稿的记录",
    },

    original: {
      type: String,
      description: "是否为原创。yes(或为空、null时)-原创, no-转载, translate-译文",
    },
    tag: {
      type: String,
      description: `文章标签。与文集中的tags对应，格式为 "<id>_<name>"`,
    },
    settop: {
      type: String,
      description: `是否置顶。默认为 "no"，置顶为"yes"`,
    },

    links: {
      type: [],
      description: `拓展链接`,
    },
    like: {
      type: [],
      description: `喜爱此文章的用户_id`,
    },
    likenum: {
      type: Number,
      description: `喜爱此文章的人数`,
    },
    reader: {
      type: [],
      description: `阅读此文章的用户_id`,
    },
    readnum: {
      type: Number,
      description: `阅读此文章的人数`,
    },

    isTemplate: {
      type: Boolean,
      description: `是否为模板`,
    },

    url: {
      type: String,
      description: "以 server.emailRoot 为根目录，绝对路径需要在前面加上 server.articleRoot",
    },
    img_url: {
      type: String,
      description: "第一个图片的url",
    },

    version: {
      type: String,
      description: "当前版本",
    },
    releasedversion: {
      type: String,
      description: "发布的版本",
    },
    releasedversionName: {
      type: String,
      description: "发布的版本",
    },
    release_log: {
      type: [
        {
          id: { type: String, description: "随机id" },
          date: { type: String, description: "发布日期" },
          version: { type: String, description: "版本" },
          releasedversion: { type: String, description: "发布版本" },
          content: { type: String, description: "发布信息" },
        },
      ],
      description: "每个发布版本的更新信息",
    },

    firstauthor: {
      type: String,
      description: "原始作者，创建文章时，与author字段一起赋值",
    },
    takeover: {
      type: [
        {
          id: { type: String, description: "随机id" },
          date: { type: String, description: "发生日期" },
          author: { type: String, description: "原作者" },
          newauthor: { type: String, description: "接收作者" },
          exinfo: { type: String, description: "补充信息" },
          operator: { type: String, description: "补操作人充信息" },
        },
      ],
      description: "文档交接产生的记录",
    },

    date_release: {
      type: Date,
      description: "发布时更新该字段",
    },
    date_delete: {
      type: Date,
      description: "移入回收站时更新该字段",
    },
    date_publish: {
      type: Date,
      description: "收录专题时更新该字段",
    },

    comment: {
      description: "评论",
      type: [
        {
          id: { type: String, description: "随机id" },
          date: { type: String, description: "发生日期" },
          name: { type: String, description: "发言人" },
          type: { type: String, description: "类型" },
          content: { type: String, description: "评论内容" },
          content_type: { type: String, description: "内容格式", enum: ["html", "markdown"] },
          headimg: { type: String, description: "头像" },
          ref_id: { type: String, description: "评论引用id" },
          isguest: { type: String, description: "是否为游客" },
        },
      ],
    },

    history: {
      description: "历史版本记录",
      type: [
        {
          _id: { type: String, description: "随机id" },
          date: { type: String, description: "发生日期" },
          version: { type: String, description: "版本" },
          devicetype: { type: String, description: "设备类型", enum: ["pc", "mobile"] },

          // autosave-自动保存, manualsave-手动保存, release-发布, update-发布更新
          savetype: { type: String, description: "保存类型", enum: saveTypes },
        },
      ],
    },

    attachment: {
      description: "文章附件列表",
      type: [
        {
          id: { type: String, description: "随机id" },
          name: { type: String, description: "附件名称" },
          private: { type: String, description: `是否仅作者本人可见(默认为"yes")` },
          realname: { type: String, description: "实际存储的文件名" },
        },
      ],
    },

    isencrypted: {
      type: Boolean,
      description: "文章是否加密",
    },
    passwd: {
      type: String,
      description: "如果文章加密，则此字段为此文章的密码；否则此字段无效",
    },
    allow_reader: {
      type: [String],
      description: "允许阅读此文章的用户id列表",
    },
    allow_group: {
      type: [String],
      description: "允许阅读此文章的用户组id列表",
    },

    isBoardMode: {
      type: Boolean,
      description: "Markdown看板模式",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
schema.method({});

const ArticleModel = mongoose.model("article", schema);

export default ArticleModel;

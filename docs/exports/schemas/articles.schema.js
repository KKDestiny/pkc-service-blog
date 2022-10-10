export default {
  "definitions": {
    "Articles": {
      "properties": {
        "title": {
          "example": "string",
          "type": "string",
          "description": "文章标题"
        },
        "abstract": {
          "example": "string",
          "type": "string",
          "description": "文章摘要。写入前必须转为纯文字"
        },
        "author": {
          "example": "string",
          "type": "string",
          "description": "文章作者"
        },
        "login": {
          "example": "string",
          "type": "string",
          "description": "文章作者(统一账户)"
        },
        "author_url": {
          "example": "string",
          "type": "string",
          "description": "作者头像url"
        },
        "editor": {
          "example": "markdown",
          "type": "string",
          "description": "编辑器类型，默认为Markdown，还可以有 HTML编辑器-\"html\" 和 富文本编辑器-\"richtext\""
        },
        "status": {
          "example": "released",
          "type": "string",
          "description": "状态"
        },
        "ispublished": {
          "example": "string",
          "type": "string",
          "description": "是否被收录。此字段在文章创建时候默认为\"no\"，在文章被收录时候置为 “yes”；如果用户撤稿，此字段需重置为“no”"
        },
        "categorieid": {
          "example": "string",
          "type": "string",
          "description": "所属模块。默认为 default。具体id参照config/article.js里的定义"
        },
        "private_categorieid": {
          "example": "string",
          "type": "string",
          "description": "私人文集， 默认为 default"
        },
        "publishto": {
          "example": "string",
          "type": "string",
          "description": "创建文章时置为“default”。向某一专题投稿。 最终写入 categorieid"
        },
        "publishtologs": {
          "type": "array",
          "description": "向某一专题投稿的记录",
          "items": {
            "date": {
              "example": "string",
              "type": "string",
              "description": "投稿日期"
            },
            "categorieid": {
              "example": "string",
              "type": "string",
              "description": "目标文集id"
            },
            "operator": {
              "example": "string",
              "type": "string",
              "description": "操作者"
            },
            "exinfo": {
              "example": "string",
              "type": "string",
              "description": "信息"
            },
            "result": {
              "example": "confused",
              "type": "string",
              "description": "结果"
            }
          }
        },
        "original": {
          "example": "string",
          "type": "string",
          "description": "是否为原创。yes(或为空、null时)-原创, no-转载, translate-译文"
        },
        "tag": {
          "example": "string",
          "type": "string",
          "description": "文章标签。与文集中的tags对应，格式为 \"<id>_<name>\""
        },
        "settop": {
          "example": "string",
          "type": "string",
          "description": "是否置顶。默认为 \"no\"，置顶为\"yes\""
        },
        "likenum": {
          "example": 100,
          "type": "number",
          "description": "喜爱此文章的人数"
        },
        "readnum": {
          "example": 100,
          "type": "number",
          "description": "阅读此文章的人数"
        },
        "isTemplate": {
          "example": false,
          "type": "boolean",
          "description": "是否为模板"
        },
        "url": {
          "example": "string",
          "type": "string",
          "description": "以 server.emailRoot 为根目录，绝对路径需要在前面加上 server.articleRoot"
        },
        "img_url": {
          "example": "string",
          "type": "string",
          "description": "第一个图片的url"
        },
        "version": {
          "example": "string",
          "type": "string",
          "description": "当前版本"
        },
        "releasedversion": {
          "example": "string",
          "type": "string",
          "description": "发布的版本"
        },
        "releasedversionName": {
          "example": "string",
          "type": "string",
          "description": "发布的版本"
        },
        "release_log": {
          "type": "array",
          "description": "每个发布版本的更新信息",
          "items": {
            "date": {
              "example": "string",
              "type": "string",
              "description": "发布日期"
            },
            "version": {
              "example": "string",
              "type": "string",
              "description": "版本"
            },
            "releasedversion": {
              "example": "string",
              "type": "string",
              "description": "发布版本"
            },
            "content": {
              "example": "string",
              "type": "string",
              "description": "发布信息"
            }
          }
        },
        "firstauthor": {
          "example": "string",
          "type": "string",
          "description": "原始作者，创建文章时，与author字段一起赋值"
        },
        "takeover": {
          "type": "array",
          "description": "文档交接产生的记录",
          "items": {
            "date": {
              "example": "string",
              "type": "string",
              "description": "发生日期"
            },
            "author": {
              "example": "string",
              "type": "string",
              "description": "原作者"
            },
            "newauthor": {
              "example": "string",
              "type": "string",
              "description": "接收作者"
            },
            "exinfo": {
              "example": "string",
              "type": "string",
              "description": "补充信息"
            },
            "operator": {
              "example": "string",
              "type": "string",
              "description": "补操作人充信息"
            }
          }
        },
        "date_release": {
          "example": "2022-10-08T08:51:33.573Z",
          "type": "string",
          "format": "datetime",
          "description": "发布时更新该字段"
        },
        "date_delete": {
          "example": "2022-10-08T08:51:33.573Z",
          "type": "string",
          "format": "datetime",
          "description": "移入回收站时更新该字段"
        },
        "date_publish": {
          "example": "2022-10-08T08:51:33.573Z",
          "type": "string",
          "format": "datetime",
          "description": "收录专题时更新该字段"
        },
        "comment": {
          "type": "array",
          "description": "评论",
          "items": {
            "date": {
              "example": "string",
              "type": "string",
              "description": "发生日期"
            },
            "name": {
              "example": "string",
              "type": "string",
              "description": "发言人"
            },
            "type": {
              "example": "string",
              "type": "string",
              "description": "类型"
            },
            "content": {
              "example": "string",
              "type": "string",
              "description": "评论内容"
            },
            "content_type": {
              "example": "html",
              "type": "string",
              "description": "内容格式"
            },
            "headimg": {
              "example": "string",
              "type": "string",
              "description": "头像"
            },
            "ref_id": {
              "example": "string",
              "type": "string",
              "description": "评论引用id"
            },
            "isguest": {
              "example": "string",
              "type": "string",
              "description": "是否为游客"
            }
          }
        },
        "history": {
          "type": "array",
          "description": "历史版本记录",
          "items": {
            "date": {
              "example": "string",
              "type": "string",
              "description": "发生日期"
            },
            "version": {
              "example": "string",
              "type": "string",
              "description": "版本"
            },
            "devicetype": {
              "example": "pc",
              "type": "string",
              "description": "设备类型"
            },
            "savetype": {
              "example": "autosave",
              "type": "string",
              "description": "保存类型"
            }
          }
        },
        "attachment": {
          "type": "array",
          "description": "文章附件列表",
          "items": {
            "name": {
              "example": "string",
              "type": "string",
              "description": "附件名称"
            },
            "private": {
              "example": "string",
              "type": "string",
              "description": "是否仅作者本人可见(默认为\"yes\")"
            },
            "realname": {
              "example": "string",
              "type": "string",
              "description": "实际存储的文件名"
            }
          }
        },
        "isencrypted": {
          "example": false,
          "type": "boolean",
          "description": "文章是否加密"
        },
        "passwd": {
          "example": "string",
          "type": "string",
          "description": "如果文章加密，则此字段为此文章的密码；否则此字段无效"
        },
        "allow_reader": {
          "type": "array",
          "description": "允许阅读此文章的用户id列表",
          "items": {}
        },
        "allow_group": {
          "type": "array",
          "description": "允许阅读此文章的用户组id列表",
          "items": {}
        }
      }
    }
  }
};
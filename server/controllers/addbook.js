const https = require('https')
const {mysql} = require('../qcloud')
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 入库
module.exports = async (ctx, next) => {
    const {isbn, openId} = ctx.request.body
    console.log('添加图书', isbn, openId)
    if (isbn && openId) {
        const findRes = await mysql('books').select().where('isbn',isbn)
        // 图书已经存在
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已经存在'
                }
            }
            return
        }

        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        // console.log(bookinfo)
        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo
        const tags = bookinfo.tags.map(v => {
                    return `${v.title} ${v.count}`
                }).join(',')
        const author = bookinfo.author.join(',')
       // console.log(title, image, alt, publisher, summary, price, rate, tags, author)
        try {
            await mysql('books').insert({isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
              code: 0,
              title,
              msg: 'success'
            }
          } catch (e) {
            ctx.state = {
              code: -1,
              data: {
                msg: '新增失败:' + e.sqlMessage
              }
            }
          }
    }
}

function getJSON (url) {
    return new Promise((reslove, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    reslove(bookinfo)
                } else {
                    reject(bookinfo)
                }
            })
        })
    })
}
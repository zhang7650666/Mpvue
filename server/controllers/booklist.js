const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    const {page, size} = ctx.request.query
    const books = await mysql('books')
                        .select('books.*', 'csessioninfo.user_info')
                        .join('csessioninfo', 'books.openId', 'csessioninfo.open_id')
                        .limit(size)
                        .offset(Number(page) * size)
                        .orderBy('books.id', 'desc')
    ctx.state.data = {
        code: 0,
        list: books.map( item => {
            const info = JSON.parse(item.user_info)
            return Object.assign({}, item, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
    
}
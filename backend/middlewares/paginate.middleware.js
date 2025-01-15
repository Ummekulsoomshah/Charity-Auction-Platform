function paginate(req, res, next) {
    //console.log('Query Parameters:', req.query);
    const page=parseInt(req.query.page)
    const limit=parseInt(req.query.limit)
    const startIndex=(page-1)*limit
    const lastindex=page*limit
    req.pagination = {
        page,
        limit,
        startIndex,
        lastindex
    };
    next();
}

module.exports = paginate;
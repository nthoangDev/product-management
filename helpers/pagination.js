module.exports = (objPagination, query, countProducts) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItem;

    const totalPage = Math.ceil(countProducts / objPagination.limitItem);
    objPagination.totalPage = totalPage;
    
    return objPagination;
}
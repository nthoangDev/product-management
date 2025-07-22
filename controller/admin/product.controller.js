const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    // Tìm kiếm
    objSearch = searchHelper(req.query);

    if (objSearch.regex) {
        find.title = objSearch.regex;
    }

    // Pagination
    let objPagination = {
        currentPage: 1,
        limitItem: 4
    };

    if (req.query.page) {
        objPagination.currentPage = parseInt(req.query.page);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItem;

    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/objPagination.limitItem);
    objPagination.totalPage = totalPage;
    const products = await Product.find(find).limit(objPagination.limitItem).skip(objPagination.skip);

    res.render('admin/pages/products/index', {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objPagination
    });
}
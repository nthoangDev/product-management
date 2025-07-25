const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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
    const countProducts = await Product.countDocuments(find);
    let objPagination = paginationHelper({
        currentPage: 1,
        limitItem: 4
    }, req.query, countProducts);

    const products = await Product.find(find).limit(objPagination.limitItem).skip(objPagination.skip);

    res.render('admin/pages/products/index', {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objPagination
    });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    res.redirect(req.get('referer') || "/");

}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        default:
            break;
    }

    res.redirect(req.get("referer") || '/');
}
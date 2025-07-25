// Search
const btnStatus = document.querySelectorAll("[button-status]");

if (btnStatus.length > 0) {
    btnStatus.forEach(btn => {
        btn.addEventListener('click', () => {
            let url = new URL(window.location.href);

            let status = btn.getAttribute("button-status");
            // console.log(status);
            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    });
}


const searchForm = document.querySelector("#form-search");

if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let url = new URL(window.location.href);

        let keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;

        // console.log(e.target.elements.keyword.value);
    })
}

//Pagination
btnPagination = document.querySelectorAll("[button-pagi]");
// console.log(btnPagination);

if (btnPagination) {
    btnPagination.forEach(btn => {
        btn.addEventListener("click", () => {
            let url = new URL(window.location.href);

            let page = btn.getAttribute("button-pagi");
            // console.log(page);
            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("delete");
            }

            window.location.href = url.href;
        })
    })
}

// Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(inp => {
                inp.checked = true;
            });
        } else {
            inputsId.forEach(inp => {
                inp.checked = false;
            });
        }
    });

    inputsId.forEach(inp => {
        inp.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    })
}

// Form Change Multi 
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inpChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        if (inpChecked.length > 0){
            let ids = [];
            let inputIds = document.querySelector("input[name='ids']");
            inpChecked.forEach(inp =>{
                const id = inp.value;
                ids.push(id);
            });
            inputIds.value = ids.join(",");

            formChangeMulti.submit();

        }else{
            alert("Vui lòng chọn ít nhất một bản ghi!!!")
        }
    })
}
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
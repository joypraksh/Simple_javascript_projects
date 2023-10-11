const accessKey = 'uyp_LWROumuDnqIGmzTIqMOGhubYSP4LYjMgsqRupKo';

const search_form = document.querySelector("#search_form");
const search_text = document.querySelector("#search_text");
const search = document.querySelector("#search");
const show_more = document.querySelector("#show_more");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = search_text.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    bindData(data.results)
}

function bindData(results) {
    const img_container = document.querySelector("#img_container");
    let html = '';
    results.forEach((result) => {
        console.log(result);
        html += `
            <div class="col-sm-3 mb-3">
                <a href="${result.links.html}" target="_blank"><img class="card-img-top" height="200px" width="50%" src="${result.urls.small}"></a>
            </div>`;
        img_container.innerHTML = html;
    });
    show_more.style.display = 'block';
}

search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

show_more.addEventListener("click", function () {
    page++;
    searchImages();
})
const apiKey = "1f0a6fb5ee9e4b7abd83e0c1724eb4c4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const call_api = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await call_api.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const news_container = document.getElementById("news-container");
    let html = '';
    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const previewDescription = article.description ? article.description.substring(0, 100) + '...' : '';
        const date = new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/kolkata'});

        html += `<div class="col-md-3 mb-3">
        <div class="card h-100" style="width: 18rem;">
            <img class="card-img-top" src="${article.urlToImage}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-text" style="font-size: 14px; font-weight: 600">${article.title}</h5>
                <h6 class="text-danger" style="font-size: 12px;">Published ${date}</h6>
                <p class="card-text" style="font-size: 13px;">${previewDescription} <a href="${article.url}" target="_blank">Read More</a></p>
            </div>
        </div>
    </div>`;
        news_container.innerHTML = html;
    });
}

let selectedNavItem = null;
function onNavItem(id){
    fetchNews(id);
    let navItem = document.getElementById(id);
    selectedNavItem?.classList.remove('active');
    selectedNavItem = navItem;
    selectedNavItem?.classList.add('active');
}

const searchBtn = document.querySelector('#searchBtn');
const search_text = document.querySelector('#search-text');

searchBtn.addEventListener('click', ()=>{
    const query = search_text.value;
    fetchNews(query);
    selectedNavItem.classList.remove('active');
    selectedNavItem = null;
})
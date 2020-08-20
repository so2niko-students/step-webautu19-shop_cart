export default class ViewPagination{
    paginationDOM = document.querySelector('.pagination');
    // categoriesDescrDOM = document.querySelector('.category_description');

    constructor(handleClickPagination){
        this.paginationDOM.addEventListener('click', handleClickPagination);
    }

    renderPagination({ length, size, page }){
        const pages = Math.ceil(length / size);
        const activeClass = 'pagination_link-active';

        let str = '';
        for(let i = 1; i <= pages; i++){
            const pageId = i - 1;
            const active = pageId == page ? activeClass : '';
            str += `<div class="pagination_link ${ active }" data-page="${ pageId }">${ i }</div>`;
        }

        this.paginationDOM.innerHTML = str;
    }

}
export default class ViewProduct{
    domProducts = document.querySelector('.product_list');

    constructor(handleClickBuyProduct){
        this.handleClickBuyProduct = handleClickBuyProduct;
    }

    render(products){
        this.domProducts.innerHTML = products.map(el => this.formatProduct(el)).join('');
        this.domProducts.addEventListener('click', this.handleClickBuyProduct);
    }

    formatProduct(prod){
        const { id, photo, title, price_view, description, availability } = prod;

        return `
            <div class="card_product">
                <div>
                    <img src="${ photo }" alt="${ title }">
                </div>
                <h3>${ price_view } UAH ${ title }</h3>
                <p>${ description }</p>
                <div>
                    ${ availability == 'В наличии' ? `<button data-product-id="${ id }">to cart</button>` : 'Отсутствует на складе'}
                </div>
            </div>
        `;
    }
}
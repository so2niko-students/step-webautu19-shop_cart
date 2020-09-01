export default class ModelProduct{
    url = './api.php?type=products';
    allProducts = {};
    category = 'All';

    constructor(){
        console.log('ModelProduct', this);
    }

    async loadProducts(page = 0, size = 9){
        const url = `${ this.url }&page=${ page }&size=${ size }&category=${ this.category }`;
        const req = await fetch(url);
        const resp = await req.json();
        this.formatData(resp);

        return this.products;
    }

    formatData({ data, length, page, size }){
        this.updateAllProducts(data);
        this.products = data;//узкое место
        this.pagination = {
            length,
            page,
            size
        };

        localStorage.setItem('products', JSON.stringify(this.products));
    }

    getProductsByIds(ids){//send data to cart
        return ids.reduce((acc, id) => {
            acc.push(this.allProducts[id]);
            return acc;
        }, []);
    }

    setCategory(category){
        this.category = category;
    }

    updateAllProducts(data){
        data.forEach(prod => {
            if(!this.allProducts[prod.id]){
                this.allProducts[prod.id] = prod;
            }
        });
    }

}
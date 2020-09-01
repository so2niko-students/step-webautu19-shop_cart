export default class ModelProduct{
    url = './api.php?type=products';
    allProducts = {};

    constructor(){
        console.log('ModelProduct', this);
    }

    async loadProducts(page = 0, size = 9, category = 'All'){
        const url = `${ this.url }&page=${ page }&size=${ size }&category=${ category }`;
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

        console.log(this.products);

        this.searchCategories(this.products);

        localStorage.setItem('products', JSON.stringify(this.products));
    }

    searchCategories(){
        this.categories = new Set();
        this.products.forEach(prod => {
            this.categories.add(prod.category);
        });

        return this.categories;
    }

    getProductsByIds(ids){//send data to cart
        return ids.reduce((acc, id) => {
            acc.push(this.allProducts[id]);
            return acc;
        }, []);
    }

    getProductsByCategory(category){
        if(category === 'all'){
            return this.products;
        }

        return this.products.filter(product => product.category === category);
    }

    updateAllProducts(data){
        data.forEach(prod => {
            if(!this.allProducts[prod.id]){
                this.allProducts[prod.id] = prod;
            }
        });
    }

}
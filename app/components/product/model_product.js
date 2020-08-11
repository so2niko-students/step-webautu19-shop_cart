export default class ModelProduct{
    url = './api.php?type=products';

    constructor(){
        console.log('ModelProduct', this);
    }

    async loadProducts(){
        const req = await fetch(this.url);
        const resp = await req.json();
        this.formatData(resp);

        return this.products;
    }

    formatData(str){
        this.products = str;
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

    getProductsByIds(ids){
        return this.products.filter(product => ids.includes(product.id));
    }

    getProductsByCategory(category){
        if(category === 'all'){
            return this.products;
        }
        return this.products.filter(product => product.category === category);
    }

}
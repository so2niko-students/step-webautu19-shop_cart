export default class ModelForm{
    products = [];
    apiUrl = './api.php';

    setProductCart(products){
        this.products = products;
        console.log(products);
    }

    sendOrder(userData){
        const { email, name, tel } = userData;
        const products4Send = this.products.map(({ id, title, price, count }) => {
            return {
                id, 
                title, 
                price,
                count
            }
        });

        const products = JSON.stringify(products4Send);

        const email2 = email.replace(/\./g, '\\.');
        console.log(email2);
        
        const url = `${ this.apiUrl }?type=order&email=${ email2 }&name=${ name }&tel=${ tel }&products=${ products }`;
        fetch(url);
    }
}

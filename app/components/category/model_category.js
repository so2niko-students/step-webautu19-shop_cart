export default class ModelCategory{
    url = './api.php?type=categories';

    constructor(){
        this.loadCategoriesList();
    }

    async loadCategoriesList(){
        const req = await fetch(this.url);
        const catList = await req.json();
        this.catList = catList.reduce((acc, { name, description }) => {
            acc[name] = description;
            return acc;
        }, {});

        this.catList.all = '';
    }

    getDescr(cat){
        return this.catList[cat];
    }
}
export default class ModelCategory{
    url = './api.php?type=categories';

    constructor(handleLoadCategories){
        this.handleLoadCategories = handleLoadCategories;

        this.loadCategoriesList();
    }

    async loadCategoriesList(){
        const req = await fetch(this.url);
        const catList = await req.json();
        this.catList = catList.reduce((acc, { name, description }) => {
            acc[name] = description;
            return acc;
        }, {});

        this.categories = Object.keys(this.catList);

        this.catList.all = '';

        this.handleLoadCategories(this.categories);
    }

    getDescr(cat){
        return this.catList[cat];
    }
}
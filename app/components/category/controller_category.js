import ViewCategory from "./view_category.js";
import ModelCategory from "./model_category.js";

export default class ControllerCategory{
    constructor({ publish,  events }){
        this.model = new ModelCategory(this.handleLoadCategories);
        this.view = new ViewCategory(this.handleClickCategory);

        this.publish = publish;
        this.events = events;
    }

    handleLoadCategories = categories => {
        this.view.renderCategories(categories);
    }

    handleClickCategory = ev => {
        const cat = ev.target.dataset.category;
        if(cat){
            this.publish(this.events.CHANGE_CATEGORY, cat);
            const descr = this.model.getDescr(cat);
            this.view.renderCatDescr(descr);
        }
    }

}
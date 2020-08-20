import ViewPagination from "./view_pagination.js";

export default class ControllerPagination{
    constructor({ publish, subscribe, events }){
        this.view = new ViewPagination(this.handleClickPagination);

        this.publish = publish;
        this.subscribe = subscribe;
        this.events = events;

        this.subscribe(events.LOAD_PRODUCTS, this.handleLoadProducts);
    }

    handleLoadProducts = pagination => {
        this.view.renderPagination(pagination);
    }

    handleClickPagination = ev => {
        const page = ev.target.dataset.page;
        if(page){
            this.publish(this.events.CHOOSE_PAGINATION, page);
        }
    }

}
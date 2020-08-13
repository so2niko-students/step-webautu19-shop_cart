import ModelForm from "./model_form.js";
import ViewForm from "./view_form.js";

export default class ControllerForm{
    constructor({ subscribe, events, publish }){
        this.model = new ModelForm();
        this.view = new ViewForm(this.handleOrder, this.handleCloseModal);

        this.subscribe = subscribe;
        this.publish = publish;
        this.events = events;

        this.subscribe(events.BUY, this.handleBuy);
    }

    handleBuy = (products) => {
        this.model.setProductCart(products);
        this.view.renderForm();
    }

    handleOrder = (ev) => {
        const userData = this.view.getData(ev);
        this.model.sendOrder(userData);
        this.view.closeModal();

        this.publish(this.events.SEND_ORDER);
    }

    handleCloseModal = () => {
        this.view.closeModal();
    }
}
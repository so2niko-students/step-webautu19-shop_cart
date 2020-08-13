import ViewNotification from "./view_notification.js";

export default class ControllerNotification{
    constructor({ subscribe, events }){
        subscribe(events.ADD_TO_CART, this.handleAddToCart);
        subscribe(events.SEND_ORDER, this.handleSendOrder);
        this.view = new ViewNotification();
    }

    handleAddToCart = () => {
        this.view.renderMessage('ADD_TO_CART');
    }

    handleSendOrder = () => {
        this.view.renderMessage('THANKS_FOR_ORDER');
    }
}
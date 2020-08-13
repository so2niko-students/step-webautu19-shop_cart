export default class ViewNotification{
    notificationDOM = document.querySelector('.notification');
    showClass = 'show_notification';
    messages = {
        ADD_TO_CART : 'ДОБАВЛЕН В КОРЗИНУ',
        THANKS_FOR_ORDER : 'СПАСИБО ЗА ВАШ ЗАКАЗ'
    }

    renderMessage(msg = 'ADD_TO_CART'){
        this.notificationDOM.innerHTML = `<strong>${ this.messages[msg] }</strong>`;
        this.notificationDOM.classList.add(this.showClass);

        setTimeout(() => this.notificationDOM.classList.remove(this.showClass), 4000);
    }
    /**
     * 2sec - up
     * 2sec - wait
     * 2sec - down
     */
}
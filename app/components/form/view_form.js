export default class ViewForm{
    modalWindow = document.querySelector('.modal');
    closeClass = 'close';

    constructor(handleOrder, handleClose){
        this.handleOrder = handleOrder;
        this.handleClose = handleClose;
    }

    renderForm(){
        this.modalWindow.innerHTML = `<div class="modal_cart">
            <div class="cart_buttons">
                <button class="btn_modal_close">X</button>
            </div>
            <form action="#">
                <p>
                    <input type="text" placeholder="your name" autofocus name="name">
                </p>
                <p>
                    <input type="email" placeholder="your email" name="email">
                </p>
                <p>
                    <input type="tel" placeholder="tel number" name="tel">
                </p>
                <button type="submit">Buy</button>
            </form>
        </div>`;

        this.modalWindow.classList.remove(this.closeClass);

        this.modalWindow.querySelector('form').addEventListener('submit', this.handleOrder);
        this.modalWindow.querySelector('.btn_modal_close').addEventListener('click', this.handleClose);
    }

    getData(ev){
        ev.preventDefault();
        const { email, name, tel } = ev.target.elements;
        return {
            email : email.value,
            name : name.value,
            tel : tel.value
        }
    }

    closeModal(){
        this.modalWindow.innerHTML = '';
        this.modalWindow.classList.add(this.closeClass);
    }
}
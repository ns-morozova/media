import Message from "./message";
export default class Timeline{
    constructor (element) {
        this.element = element;
        this.messages = [];
    }

    init() {
        const inpMess = this.element.querySelector('.inpmessage');
        inpMess.addEventListener('change',this.onInputMessage.bind(this)); 
    }

    onInputMessage(event) {
        event.preventDefault();
        const inpMess = this.element.querySelector('.inpmessage');
        const chat = document.createElement('div');
        chat.classList.add('containerChat');
        const mess = new Message(chat);
        mess.init(inpMess.value);
        this.messages.push(mess);   
        inpMess.value = '';  
        this.element.appendChild(chat);

    }
}
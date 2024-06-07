import Message from "./message";
export default class Timeline {
    constructor(element) {
        this.element = element;
        this.messages = [];
        this.pos;
    }

    init() {
        const inpMess = this.element.querySelector('.inpmessage');
        inpMess.addEventListener('change', this.onInputMessage.bind(this));
    }

    async openModal() {
        return new Promise((resolve, reject) => {

            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Введите координаты</h2>
                <label for="latitude">Широта:</label>
                <input type="text" id="latitude">
                <label for="longitude">Долгота:</label>
                <input class="longitude" type="text" id="longitude">
                <button id="ok">Подтвердить</button>
                <button id="cancel">Закрыть</button>
            </div>
            `;


            document.body.appendChild(modal);
            modal.style.display = "block";
            
            modal.querySelector('#ok').addEventListener('click',event => {
                event.preventDefault();
                modal.style.display = "none";
                const latitude = document.getElementById('latitude').value;
                const longitude = document.getElementById('longitude').value;
                document.getElementById('latitude').value = '';
                document.getElementById('longitude').value = '';

                resolve({ long: Number(longitude), lat: Number(latitude) });

            });

            modal.querySelector('#cancel').addEventListener('click', event => {
                event.preventDefault();
                modal.style.display = "none";
                reject(new Error('Координаты не определены'));

            });
        });

    }

    async getPosition(geolocation) {
        if (geolocation) {
            this.pos = undefined;
            try {
                this.pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                return {
                    long: this.pos.coords.longitude,
                    lat: this.pos.coords.latitude,

                };

            } catch (err) { 
                console.log(err);
            }            
        }    
        return this.openModal();    
    }

    onInputMessage(event) {
        event.preventDefault();

        const promise = this.getPosition(navigator.geolocation);
        promise.then(pos => {
            const inpMess = this.element.querySelector('.inpmessage');
            const chat = document.createElement('div');
            chat.classList.add('containerChat');
            const mess = new Message(chat);
            pos.message = inpMess.value;
            mess.init(pos);
            this.messages.push(mess);
            inpMess.value = '';
            this.element.appendChild(chat);

        }).catch(err => {
            alert(err.message);
        });

    }
}
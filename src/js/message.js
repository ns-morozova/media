export default class Message {
    constructor (element) {
        this.element = element;
    }

    init(pos) {
        const date = this.getDateFormat(new Date);
        this.element.innerHTML = `
            <div style="display: flex; justify-content: flex-end;">
                <span>${date}</span>
            </div>
            <span>${pos.message}</span>
            <span>[${pos.long},${pos.lat}]</span>
        `;

    }

    getDateFormat(date) {
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();

        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let seconds = ("0" + date.getSeconds()).slice(-2);

        return day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
    }

}
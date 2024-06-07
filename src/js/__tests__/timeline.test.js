import Timeline from "../timeline";
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
const chat = new Timeline(document.querySelector('.container'));
chat.openModal = jest.fn();

test('Вызов модального окна для ввода координат', () => {
    chat.getPosition(null).then(() => {
        expect(chat.openModal).toBeCalled();
    });
}); 

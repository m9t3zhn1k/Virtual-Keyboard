import Button from "../button/Button";
import { codes } from "./key_codes";

export default class Keyboard {
  constructor() {
    this.createKeyboard();
  }
  createKeyboard = () => {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard keyboard__container';
    codes.forEach((code, index) => keyboard.append(new Button(index).createButton()));
    return keyboard;
  }

}

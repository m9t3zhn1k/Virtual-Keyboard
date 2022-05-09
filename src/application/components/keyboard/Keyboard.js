import Button from '../button/Button.js';
import { keyCodes } from './keyCodes.js';

export default class Keyboard {
  constructor() {
    this.keyboard = document.createElement('div');
  }

  createKeyboard = () => {
    this.keyboard.className = 'keyboard keyboard__container';
    keyCodes.forEach((code, index) => this.keyboard.append(new Button(index).createButton()));
    return this.keyboard;
  };
}

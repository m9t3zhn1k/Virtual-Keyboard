import Button from '../button/Button.js';
import { keyCodes } from './keyCodes.js';

export default class Keyboard {
  constructor() {
    this.keyboard = document.createElement('div');
    this.addEventListeners();
  }

  addEventListeners = () => {
    window.addEventListener('keydown', this.animatePressedButton);
    window.addEventListener('keyup', this.animateUnpressedButton);
    window.addEventListener('mousedown', this.animatePressedButtonClick);
    window.addEventListener('mouseup', this.animateUnpressedButtonClick);
    window.addEventListener('mouseout', this.animateUnpressedButtonClick);
  }

  createKeyboard = () => {
    this.keyboard.className = 'keyboard keyboard__container';
    keyCodes.forEach((code, index) => this.keyboard.append(new Button(index).createButton()));
    return this.keyboard;
  }

  animatePressedButton = () => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}`);
    if (button) {
      event.preventDefault();
      button.classList.add('active');
    }
  }

  animateUnpressedButton = () => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}.active`);
    if (button) {
      event.preventDefault();
      button.classList.remove('active');
    }
  }

  animatePressedButtonClick = () => {
    const button = event.target.closest(`.keyboard__key`);
    if (button) {
      event.preventDefault();
      button.classList.add('active');
    }
  }

  animateUnpressedButtonClick = () => {
    const button = event.target.closest(`.keyboard__key`);
    if (button) {
      button.classList.remove('active');
    }
  }

}

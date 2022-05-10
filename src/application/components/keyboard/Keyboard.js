import Button from '../button/Button.js';
import { keyCodes } from './keyCodes.js';
import { keyCharsSmallEn, keyCharsLargeEn, keyCharsSmallRu, keyCharsLargeRu } from './keyChars.js';

export default class Keyboard {
  lang = localStorage.getItem('lang') || 'en' ;
  isUppercase = false;
  isCaps = false;
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
    this.updateKeyboard();
    return this.keyboard;
  }

  updateKeyboard = () => {
    const buttons = [...this.keyboard.children];
    if (this.lang === 'en' && !this.isUppercase) {
      buttons.map((button, index) => button.firstElementChild.innerHTML = `${keyCharsSmallEn[index]}`);
    } else if (this.lang === 'en' && this.isUppercase) {
      buttons.map((button, index) => button.firstElementChild.innerHTML = `${keyCharsLargeEn[index]}`);
    } else if (this.lang === 'ru' && !this.isUppercase) {
      buttons.map((button, index) => button.firstElementChild.innerHTML = `${keyCharsSmallRu[index]}`);
    } else if (this.lang === 'ru' && this.isUppercase) {
      buttons.map((button, index) => button.firstElementChild.innerHTML = `${keyCharsLargeRu[index]}`);
    }
  }

  changeKeyBoardLayout = () => {
    const isControlLeftPressed = this.keyboard.querySelector('.ControlLeft').classList.contains('active');
    const isControlRightPressed = this.keyboard.querySelector('.ControlRight').classList.contains('active');
    const isAltLeftPressed = this.keyboard.querySelector('.AltLeft').classList.contains('active');
    const isAltRightPressed = this.keyboard.querySelector('.AltRight').classList.contains('active');
    const isShiftLeftPressed = this.keyboard.querySelector('.ShiftLeft').classList.contains('active');
    const isShiftRightPressed = this.keyboard.querySelector('.ShiftRight').classList.contains('active');
    const isCapsLockPressed = this.keyboard.querySelector('.CapsLock').classList.contains('active');
    if ((isControlLeftPressed && isAltLeftPressed || isControlRightPressed && isAltRightPressed) && !event.repeat) {
      this.lang = this.lang === 'en' ? 'ru' : 'en';
      localStorage.setItem('lang', this.lang);
      this.updateKeyboard();
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'CapsLock') {
      if (((isShiftLeftPressed || isShiftRightPressed) || isCapsLockPressed) && !event.repeat) {
        this.isUppercase = !this.isUppercase;
        this.updateKeyboard();
      } else if (!((isShiftLeftPressed || isShiftRightPressed) || isCapsLockPressed) && !event.repeat) {
        this.isUppercase = false;
        this.updateKeyboard();
      }
    }
  }

  animatePressedButton = () => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}`);
    if (button) {
      if (button.classList.contains('CapsLock') && button.classList.contains('active')) {
        event.preventDefault();
        button.classList.remove('active');
        this.changeKeyBoardLayout();
        return;
      }
      event.preventDefault();
      button.classList.add('active');
      this.changeKeyBoardLayout();
    }
  }

  animateUnpressedButton = () => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}.active`);
    if (button) {
      if (button.classList.contains('CapsLock')) {
        return;
      }
      event.preventDefault();
      button.classList.remove('active');
      this.changeKeyBoardLayout();
    }
  }

  animatePressedButtonClick = () => {
    const button = event.target.closest(`.keyboard__key`);
    if (button) {
      event.preventDefault();
      button.classList.add('active');
      this.changeKeyBoardLayout();
    }
  }

  animateUnpressedButtonClick = () => {
    const button = event.target.closest(`.keyboard__key`);
    if (button) {
      button.classList.remove('active');
      this.changeKeyBoardLayout();
    }
  }

}

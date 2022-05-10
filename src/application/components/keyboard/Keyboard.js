import Button from '../button/Button';
import keyCodes from './keyCodes';
import {
  keyCharsSmallEn, keyCharsLargeEn, keyCharsSmallRu, keyCharsLargeRu,
} from './keyChars';

export default class Keyboard {
  lang = localStorage.getItem('lang') || 'en';

  isCaps = false;

  isShift = false;

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
  };

  createKeyboard = () => {
    this.keyboard.className = 'keyboard keyboard__container';
    keyCodes.forEach((code, index) => this.keyboard.append(new Button(index).createButton()));
    this.updateKeyboard();
    return this.keyboard;
  };

  updateKeyboard = () => {
    const buttons = [...this.keyboard.children];
    if (this.lang === 'en') {
      buttons.map((key, index) => {
        const button = key;
        button.firstElementChild.innerHTML = `${keyCharsSmallEn[index]}`;
        return button;
      });
      if (this.isCaps && !this.isShift) {
        buttons.map((key) => {
          const button = key;
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'a'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'z'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toUpperCase();
          }
          return button;
        });
      }
      if (this.isShift && !this.isCaps) {
        buttons.map((key, index) => {
          const button = key;
          button.firstElementChild.innerHTML = `${keyCharsLargeEn[index]}`;
          return button;
        });
      }
      if (this.isCaps && this.isShift) {
        buttons.map((key, index) => {
          const button = key;
          button.firstElementChild.innerHTML = `${keyCharsLargeEn[index]}`;
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'A'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'Z'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toLowerCase();
          }
          return button;
        });
      }
    }
    if (this.lang === 'ru') {
      buttons.map((key, index) => {
        const button = key;
        button.firstElementChild.innerHTML = `${keyCharsSmallRu[index]}`;
        return button;
      });
      if (this.isCaps && !this.isShift) {
        buttons.map((key) => {
          const button = key;
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'а'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'ё'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toUpperCase();
          }
          return button;
        });
      }
      if (this.isShift && !this.isCaps) {
        buttons.map((key, index) => {
          const button = key;
          button.firstElementChild.innerHTML = `${keyCharsLargeRu[index]}`;
          return button;
        });
      }
      if (this.isCaps && this.isShift) {
        buttons.map((key, index) => {
          const button = key;
          button.firstElementChild.innerHTML = `${keyCharsLargeRu[index]}`;
          if (button.firstElementChild.innerHTML.length === 1) {
            if ((button.firstElementChild.innerHTML.charCodeAt(0) >= 'А'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'Я'.codePointAt(0)) || button.firstElementChild.innerHTML.charCodeAt(0) === 'Ё'.codePointAt(0)) {
              button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toLowerCase();
            }
          }
          return button;
        });
      }
    }
  };

  changeKeyBoardLayout = (event) => {
    const isControlLeft = this.keyboard.querySelector('.ControlLeft').classList.contains('active');
    const isControlRight = this.keyboard.querySelector('.ControlRight').classList.contains('active');
    const isAltLeft = this.keyboard.querySelector('.AltLeft').classList.contains('active');
    const isAltRight = this.keyboard.querySelector('.AltRight').classList.contains('active');
    const isShiftLeft = this.keyboard.querySelector('.ShiftLeft').classList.contains('active');
    const isShiftRight = this.keyboard.querySelector('.ShiftRight').classList.contains('active');
    const isCapsLock = this.keyboard.querySelector('.CapsLock').classList.contains('active');
    if (((isControlLeft || isControlRight) && (isAltRight || isAltLeft)) && !event.repeat) {
      this.lang = this.lang === 'en' ? 'ru' : 'en';
      localStorage.setItem('lang', this.lang);
      this.updateKeyboard();
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'CapsLock') {
      if (((isShiftLeft || isShiftRight) || isCapsLock) && !event.repeat) {
        this.isUppercase = !this.isUppercase;
        this.updateKeyboard();
      } else if (!((isShiftLeft || isShiftRight) || isCapsLock) && !event.repeat) {
        this.isUppercase = false;
        this.updateKeyboard();
      }
    }
  };

  animatePressedButton = (event) => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}`);
    if (button && !event.repeat) {
      if (button.classList.contains('CapsLock') && button.classList.contains('active')) {
        event.preventDefault();
        button.classList.remove('active');
        this.isCaps = false;
        this.changeKeyBoardLayout(event);
        return;
      }
      if (button.classList.contains('CapsLock')) {
        this.isCaps = true;
      }
      if (button.classList.contains('ShiftLeft') || button.classList.contains('ShiftRight')) {
        this.isShift = true;
      }
      event.preventDefault();
      button.classList.add('active');
      this.changeKeyBoardLayout(event);
    }
  };

  animateUnpressedButton = (event) => {
    const button = this.keyboard.querySelector(`.keyboard__key.${event.code}.active`);
    if (button && !event.repeat) {
      if (button.classList.contains('CapsLock')) {
        return;
      }
      if (button.classList.contains('ShiftLeft') || button.classList.contains('ShiftRight')) {
        this.isShift = false;
      }
      event.preventDefault();
      button.classList.remove('active');
      this.changeKeyBoardLayout(event);
    }
  };

  animatePressedButtonClick = (event) => {
    const button = event.target.closest('.keyboard__key');
    if (button) {
      event.preventDefault();
      button.classList.add('active');
      this.changeKeyBoardLayout(event);
    }
  };

  animateUnpressedButtonClick = (event) => {
    const button = event.target.closest('.keyboard__key');
    if (button) {
      button.classList.remove('active');
      this.changeKeyBoardLayout(event);
    }
  };
}

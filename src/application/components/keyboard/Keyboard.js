import Button from '../button/Button';
import keyCodes from './keyCodes';
import {
  keyCharsSmallEn, keyCharsLargeEn, keyCharsSmallRu, keyCharsLargeRu,
} from './keyChars';

export default class Keyboard {
  lang = localStorage.getItem('lang') || 'en';

  isCaps = false;

  isShift = false;

  keyboard;

  constructor() {
    this.addEventListeners();
  }

  addEventListeners = () => {
    window.addEventListener('keydown', this.animatePressedButton);
    window.addEventListener('keyup', this.animateUnpressedButton);
    window.addEventListener('mousedown', this.animatePressedButton);
    window.addEventListener('mouseup', this.animateUnpressedButton);
    window.addEventListener('mouseout', this.animateUnpressedButton);
  };

  createKeyboard = () => {
    this.keyboard = document.createElement('div');
    this.keyboard.className = 'keyboard keyboard__container';
    keyCodes.forEach((code, index) => this.keyboard.append(new Button(index).createButton()));
    this.updateKeyboard();
    return this.keyboard;
  };

  updateKeyboard = () => {
    const buttons = [...this.keyboard.children];
    buttons.map((key, index) => {
      const button = key;
      button.firstElementChild.innerHTML = this.lang === 'en' ? `${keyCharsSmallEn[index]}` : `${keyCharsSmallRu[index]}`;
      return button;
    });
    if (this.isCaps && !this.isShift) {
      buttons.map((key) => {
        const button = key;
        if (this.lang === 'en') {
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'a'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'z'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toUpperCase();
          }
        } else if (this.lang === 'ru') {
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'а'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'ё'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toUpperCase();
          }
        }
        return button;
      });
    }
    if (this.isShift && !this.isCaps) {
      buttons.map((key, index) => {
        const button = key;
        button.firstElementChild.innerHTML = this.lang === 'en' ? `${keyCharsLargeEn[index]}` : `${keyCharsLargeRu[index]}`;
        return button;
      });
    }
    if (this.isCaps && this.isShift) {
      buttons.map((key, index) => {
        const button = key;
        button.firstElementChild.innerHTML = this.lang === 'en' ? `${keyCharsLargeEn[index]}` : `${keyCharsLargeRu[index]}`;
        if (this.lang === 'en') {
          if (button.firstElementChild.innerHTML.length === 1 && (button.firstElementChild.innerHTML.charCodeAt(0) >= 'A'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'Z'.codePointAt(0))) {
            button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toLowerCase();
          }
        } else if (this.lang === 'ru') {
          if (button.firstElementChild.innerHTML.length === 1) {
            if ((button.firstElementChild.innerHTML.charCodeAt(0) >= 'А'.codePointAt(0) && button.firstElementChild.innerHTML.charCodeAt(0) <= 'Я'.codePointAt(0)) || button.firstElementChild.innerHTML.charCodeAt(0) === 'Ё'.codePointAt(0)) {
              button.firstElementChild.innerHTML = button.firstElementChild.innerHTML.toLowerCase();
            }
          }
        }
        return button;
      });
    }
  };

  animatePressedButton = (event) => {
    let button;
    if (event.type === 'keydown') {
      button = this.keyboard.querySelector(`.keyboard__key.${event.code}`);
    } else if (event.type === 'mousedown') {
      button = event.target.closest('.keyboard__key');
    }
    if (button && !event.repeat) {
      if (button.classList.contains('CapsLock') && button.classList.contains('active')) {
        event.preventDefault();
        button.classList.remove('active');
        this.isCaps = false;
        this.updateKeyboard();
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
      const isControlLeft = this.keyboard.querySelector('.ControlLeft').classList.contains('active');
      const isControlRight = this.keyboard.querySelector('.ControlRight').classList.contains('active');
      const isAltLeft = this.keyboard.querySelector('.AltLeft').classList.contains('active');
      const isAltRight = this.keyboard.querySelector('.AltRight').classList.contains('active');
      if (((isControlLeft || isControlRight) && (isAltRight || isAltLeft)) && !event.repeat) {
        this.lang = this.lang === 'en' ? 'ru' : 'en';
        localStorage.setItem('lang', this.lang);
      }
      this.updateKeyboard();
    }
  };

  animateUnpressedButton = (event) => {
    let button;
    if (event.type === 'keyup') {
      button = this.keyboard.querySelector(`.keyboard__key.${event.code}.active`);
    } else if (event.type === 'mouseup' || event.type === 'mouseout') {
      button = event.target.closest('.keyboard__key');
    }
    if (button && !event.repeat) {
      if (button.classList.contains('CapsLock')) {
        return;
      }
      if (button.classList.contains('ShiftLeft') || button.classList.contains('ShiftRight')) {
        this.isShift = false;
      }
      event.preventDefault();
      button.classList.remove('active');
      this.updateKeyboard();
    }
  };
}

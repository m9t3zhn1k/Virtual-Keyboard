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

  constructor(textarea) {
    this.addEventListeners();
    this.textarea = textarea;
  }

  addEventListeners = () => {
    window.addEventListener('keydown', this.animatePressedButton);
    window.addEventListener('mousedown', this.animatePressedButton);
    window.addEventListener('keyup', this.animateUnpressedButton);
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
    if (button) {
      event.preventDefault();
      this.writeChar(button);
      if (!event.repeat) {
        if (button.classList.contains('CapsLock') && button.classList.contains('active')) {
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
    }
  };

  writeChar = (button) => {
    this.textarea.focus();
    const char = button.firstElementChild.innerHTML;
    const index = this.textarea.selectionStart;
    if (char.length <= 1) {
      this.convertChar(char, index, 1);
    }
    if (char === '&lt;') {
      this.convertChar('<', index, 1);
    }
    if (char === '&gt;') {
      this.convertChar('>', index, 1);
    }
    if (char === '&amp;') {
      this.convertChar('&', index, 1);
    }
    if (char === 'Enter') {
      this.convertChar('\n', index, 1);
    }
    if (char === 'Tab') {
      this.convertChar('    ', index, 4);
    }
    if (char === 'Backspace') {
      if (index > 0) {
        const value = this.textarea.value.slice(0, index - 1) + this.textarea.value.slice(index);
        this.textarea.value = value;
        this.textarea.selectionStart = index - 1;
        this.textarea.selectionEnd = index - 1;
      }
    }
    if (char === 'Del') {
      if (index < this.textarea.value.length) {
        const value = this.textarea.value.slice(0, index) + this.textarea.value.slice(index + 1);
        this.textarea.value = value;
        this.textarea.selectionStart = index;
        this.textarea.selectionEnd = index;
      }
    }
  };

  convertChar = (char, i, j) => {
    this.textarea.value = `${this.textarea.value.slice(0, i)}${char}${this.textarea.value.slice(i)}`;
    this.textarea.selectionStart = i + j;
    this.textarea.selectionEnd = i + j;
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

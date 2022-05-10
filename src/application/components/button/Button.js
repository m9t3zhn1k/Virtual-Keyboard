import { keyCodes } from '../keyboard/keyCodes.js';
import { keyCharsSmallEn } from '../keyboard/keyChars.js';

export default class Button {
  constructor(index) {
    this.index = index;
  }

  createButton() {
    const key = document.createElement('div');
    const symbol = document.createElement('span');
    symbol.innerHTML = `${keyCharsSmallEn[this.index]}`;
    key.append(symbol);
    key.className = `keyboard__key ${keyCodes[this.index]}`;
    return key;
  }
}

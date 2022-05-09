import { codes } from "../keyboard/key_codes";
import { chars_small_en } from "../keyboard/key_chars_small_en";

export default class Button {
  constructor(index) {
    this.index = index;
  }
  createButton() {
    const key = document.createElement('div');
    const symbol = document.createElement('span');
    symbol.innerHTML = `${chars_small_en[this.index]}`;
    key.append(symbol);
    key.className = `keyboard__key ${codes[this.index]}`;
    return key;
  }
}

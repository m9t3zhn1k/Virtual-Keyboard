import keyCodes from '../keyboard/keyCodes';

export default class Button {
  constructor(index) {
    this.index = index;
  }

  createButton() {
    const key = document.createElement('div');
    const symbol = document.createElement('span');
    key.append(symbol);
    key.className = `keyboard__key ${keyCodes[this.index]}`;
    key.dataset.code = `${keyCodes[this.index]}`;
    return key;
  }
}

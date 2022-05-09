import AppHTML from './application.html';
import '../styles/styles.scss';
import Keyboard from './components/keyboard/Keyboard.js';

export default class Application {
  innerHTML = AppHTML;

  constructor() {
    setTimeout(this.addKeyboard, 0);
  }

  addKeyboard = () => {
    this.container = document.querySelector('.main > .container');
    const keyboard = new Keyboard().createKeyboard();
    this.container.append(keyboard);
  };
}

import AppHTML from './application.html';
import '../styles/styles.scss';
import Keyboard from './components/keyboard/Keyboard';

export default class Application {
  innerHTML = AppHTML;

  container;

  textarea;

  keyboard;

  constructor() {
    setTimeout(this.findTextarea, 0);
    setTimeout(this.addKeyboard, 0);
  }

  addKeyboard = () => {
    this.container = document.querySelector('.main > .container');
    this.keyboard = new Keyboard(this.textarea).createKeyboard();
    this.container.append(this.keyboard);
    /* this.keyboard.addEventListeners(); */
  };

  findTextarea = () => {
    this.textarea = document.getElementById('textarea');
  };
}

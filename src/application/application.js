import HTML from './application.html';
import '../styles/styles.scss';

document.body.innerHTML = HTML;

export default class Application {
  constructor() {
    this.innerHTML = HTML;
  }
}
import Application from './application/application.js';

const root = document.getElementById('root');

root.innerHTML = new Application().innerHTML;

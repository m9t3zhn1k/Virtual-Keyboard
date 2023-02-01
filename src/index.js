import Application from './application/application';

const root = document.getElementById('root');

root.innerHTML = new Application().innerHTML;

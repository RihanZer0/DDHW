import addNav from "./addNav.js";
import addProjectItem from "./addProjectItem.js";
import addTaskItem from "./addTaskItem.js";
import addPlug from "./addPlug.js";
import dropDownBtn from './dropDown.js';
import toggleNavBtn from './toggle-btn.js';
import userAva from '@/assets/img/Ava.png';
import "@/scss/style.scss";

function initPage() {
	let page = document.querySelector('.page');
	let content = document.createElement('div');
	content.classList.add('content');
	page.appendChild(content);

	page.insertAdjacentHTML('afterbegin', addNav(userAva));
	content.insertAdjacentHTML('beforeend', addProjectItem({
      name: 'Название проекта',
      projectId: '#1',
      author: 'Иванов И.И.',
      editor: 'Баранов А.А.'
    }));
	content.insertAdjacentHTML('beforeend', addTaskItem({
    userAva: userAva,
    name: `Очень длинное название проекта, создано специального для того чтоб не вместилось в одну строку, что позволит проверить не ломается ли вёрстка.
    И ещё раз очень длинное название проекта, создано специально чтоб проверить не ломается ли вёрстка.
    И ещё раз очень длинное название проекта, создано специально чтоб проверить не ломается ли вёрстка.
    И ещё раз очень длинное название проекта, создано специально чтоб проверить не ломается ли вёрстка.
    И ещё раз очень длинное название проекта, создано специально чтоб проверить не ломается ли вёрстка.`,
    projectId: '#123456890123456789012345601234567',
    author: 'Иванов И.И.',
    editor: 'Баранов А.А.'
  }));
	content.insertAdjacentHTML('beforeend', addPlug());
}

initPage();
dropDownBtn();
toggleNavBtn()
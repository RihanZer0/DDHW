import "@/assets/img/dots.svg";

function addTaskItem({userAva, name, projectId, author, editor}) {
  return `
  <div class="task-item">
    <div class="task-item__container">
      <div class="task-item__block">
        <div class="item-block__header">
        <p class="header-text">${name}</p>
          <div class="header-userAva">
            <img src=${userAva} class="task-item__userAva" alt="User" width="24" height="24">
          </div>
        </div>
        <div class="item-block__footer">
          <div class="footer">
            ${projectId} <span class="footer__name">${author} создал 1 час назад</span>
            <div class="status status-draft">Черновик</div>
          </div>
          <div class="footer">
              <span class="footer__name">${editor} изменил 1 минуту назад</span>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <button class="dropDown-btn" data-path="task-item">
        <svg>
          <use xlink:href="#dots" />
        </svg>
      </button>
      <ul data-target="task-item" class="dropDown__list">
        <li class="drop-down__item">Редактировать</li>
        <li class="drop-down__item delete">Удалить</li>
      </ul>
    </div>
  </div>
`};

export default addTaskItem;
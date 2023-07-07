import "@/assets/img/dots.svg";

function addProjectItem({name, projectId, author, editor}) {
  return `
  <div class="project-item">
    <div class="project-item__container">
      <div class="project-item__block">
        <div class="item-block__header">
          <p class="header-text">${name}</p>
        </div>
        <div class="item-block__footer">
          <div class="footer">
            ${projectId} <span class="footer__name">${author} создал 1 час назад</span>
          </div>
          <div class="footer">
            <span class="footer__name">${editor} изменил 1 минуту назад</span>
          </div>
        </div>
      </div>
    </div>
    <div class="options">
      <button class="dropDown-btn" data-path="project-item">
        <svg>
          <use xlink:href="#dots" />
        </svg>
      </button>
      <ul data-target="project-item" class="dropDown__list">
        <li class="drop-down__item">Редактировать</li>
        <li class="drop-down__item delete">Удалить</li>
      </ul>
    </div>
  </div>
`};

export default addProjectItem;
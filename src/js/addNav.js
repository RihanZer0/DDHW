import "@/assets/img/dropDown.svg";

function addNav(Ava) {
  return `
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-btn">
        <button class="btn">Проекты</button>
      </li>
      <li class="navbar__list-btn">
        <button class="btn">Задачи</button>
      </li>
      <li class="navbar__list-btn">
        <button class="btn">Пользователи</button>
      </li>
    </ul>
    <div class="navbar__user">
      <button class="dropDown-btn" data-path="user">
        <img src=${Ava} alt="Иконка профиля">
        <svg>
          <use xlink:href="#dropDown" />
        </svg>
      </button>
      <ul data-target="user" class="dropDown__list">
        <li class="dropDown__item">Профиль</li>
        <li class="dropDown__item">Выход</li>
      </ul>
    </div>
  </nav>
  `};

export default addNav;
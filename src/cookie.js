/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
import {createCookie, deleteCookie} from './index';
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let str = full.toLowerCase(),
        substring = chunk.toLowerCase();
    if (str.indexOf(substring) + 1) {
        return true;
    }
    return false;
}

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

/**
 * Создает новый tr для таблицы со списком cookie
 *
 * @param name - имя cookie
 * @param value - значение cookie
 */
function createCookieTr(name, value) {
    let tr = document.createElement('TR'),
        tdName = document.createElement('TD'),
        tdValue = document.createElement('TD'),
        tdButton = document.createElement('TD'),
        deleteButton = document.createElement('BUTTON');

    listTable.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdButton);
    tdButton.appendChild(deleteButton);

    tdName.innerText = name;
    tdValue.innerText = value;
    deleteButton.innerText = 'Удалить';
    tdName.classList.add('tdName');
    tdValue.classList.add('tdValue');

    deleteButton.addEventListener('click', function () {
        deleteCookie(name);
        cookiesUpdate();
    });
}

function cookiesUpdate(cookiesObject = getCookies()) {
    listTable.innerHTML = '';
    for (let cookies in cookiesObject) {
        createCookieTr(cookies, cookiesObject[cookies]);
    }
}

filterNameInput.addEventListener('keyup', function () {
    let cookiesObject = getCookies(),
        value = this.value.trim();
    if (!value) {
        return cookiesUpdate();
    }
    for (let name in cookiesObject) {
        if (!(isMatching(name, value) || isMatching(cookiesObject[name], value))) {
            delete cookiesObject[name];
            cookiesUpdate(cookiesObject);
        }
    }

});

addButton.addEventListener('click', (e) => {
    let name = addNameInput.value,
        value = addValueInput.value,
        filter = filterNameInput.value,
        oldCookies = getCookies();

    for (let cookieName in oldCookies) {
        if (name === cookieName) {
            deleteCookie(name);
            createCookie(name, value);
            console.log('замена куки');
            cookiesUpdate();
            return;
        }
    }
    if (!filter) {
        createCookie(name, value);
        createCookieTr(name, value);
        console.log('добавление куки');
    } else if (isMatching(name, filter) || isMatching(value, filter)) {
        createCookie(name, value);
        createCookieTr(name, value);
        console.log('фильтр не пустой');
    } else if (!(isMatching(name, filter) || isMatching(value, filter))) {
        createCookie(name, value);
        console.log('добавление куки с помощью фильтра ');
    }
});

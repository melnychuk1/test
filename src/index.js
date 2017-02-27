/* ДЗ 5.1 - DOM Events */

/**
 * Функция должна добавлять обработчик fn события eventName к элементу target
 *
 * @param {string} eventName - имя события, на которое нужно добавить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function addListener(eventName, target, fn) {
    target.addEventListener(eventName, fn);
}

/**
 * Функция должна удалять обработчик fn события eventName у элемента target
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, у которого нужно удалить обработчик
 * @param {function} fn - обработчик
 */
function removeListener(eventName, target, fn) {
    target.removeEventListener(eventName, fn);
}

/**
 * Функция должна добавлять к target обработчик события eventName, который должен отменять действие по умолчанию
 *
 * @param {string} eventName - имя события, для которого нужно удалить обработчик
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function skipDefault(eventName, target) {
    target.addEventListener(eventName, e => e.preventDefault());
}

/**
 * Функция должна эмулировать событие click для элемента target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 */
function emulateClick(target) {
    let event = new Event('click');
    target.dispatchEvent(event);
}

/**
 * Функция должна добавить такой обработчик кликов к элементу target
 * который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - функция, которую нужно вызвать при клике на элемент BUTTON внутри target
 */
function delegate(target, fn) {
    target.addEventListener('click', (e) => {
        if(e.target.tagName == 'BUTTON') {
            fn();
        }
    });
}

/**
 * *** Со звездочкой ***
 * Функция должна добавить такой обработчик кликов к элементу target
 * который сработает только один раз и удалится
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} target - элемент, на который нужно добавить обработчик
 * @param {function} fn - обработчик
 */
function once(target, fn) {
    let el = false;
    target.addEventListener('click', handler);
    function handler() {
        if (!el) {
            fn();
            el = true;
            target.removeEventListener('click', handler);
        }
    }
}

export {
    addListener,
    removeListener,
    skipDefault,
    emulateClick,
    delegate,
    once
};
/*да, тут надо сделать, задачка не долгая, хоть и сложная_
 суть в том, чтобы сначала назначить обработчик на функцию
 а после срабатывания удалить через removeEventListener
 сначала стоит ввести переменную, переключатель)
 например var handler = false
 и если она false - тогда назначить обработчик
 и переобределить ее в true
 а если она true - тогда удалить обработчик)*/
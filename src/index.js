/* ДЗ 3 - объекты и массивы */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}
/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var array1 = [];
        for (let i = 0; i < array.length; i++) {
            array1.push(fn(array[i], i, array))
        }
    return array1;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var value;
    var i = 0;
        if (initial){
            value = initial;
        } else {
            value = array[0];
            i++;
        }
        for (i; i < array.length; i++){
            value = fn(value, array[i], i, array);
        }
        return value;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var array = [];
    for(var value in obj) {
        array.push(value.toUpperCase());
    }
        return array;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
      if (to <0){
          to = array.length + to;
      }
      if (to > array.length){
          to = array.length;
      }
      if (from < 0){
          from = array.length + from;
      }
      if (-from > array.length){
          from = 0;
      }
      var result = [];
      for(from; from < to; from++){
          result.push(array[from]);
        }
        return result;
    }

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};

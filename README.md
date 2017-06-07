ToDo List
=========

Реализация ToDo List с использованием возможностей ECMAScript 6 и библиотеки Lodash

Функциональные возможности
--------------------------

Пользователь может создавать новые задания (по-умолчанию в активном состоянии), отмечать их выполненными или вернуть в исходное состояние (активные).

Пользователь может удалять элементы из списка, фильтровать по "выполненные", "активные", "все".

Так же предоставить возможность пользователю выбрать некоторые из элементов в списке и произвести с ними операции:

- Удалить все
- Отметить выполненными
- Отметить активными

Предоставить возможность сохранения выбранного фильтра при копировании ссылки и вставки в новое окно браузера.

Ключевые особенности
--------------------

- Приложение может работать как с библиотекой jQuery, так и с нативными функциями JS. Включение/отключение использования jQuery выполняется в опции engine при инициализации (строка 14 файла js/main.js)

[Демо](http://test.helene.com.ua/todo-es6/)

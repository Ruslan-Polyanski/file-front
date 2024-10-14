# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Страницы приложения
Войти и зарегистрироваться
Главная (домашняя + виджеты)
Структура (все сотрудники)
Предприятия (все предприятия)
Оборудование (все оборудование)
Профиль сотрудника

Отметить сотрудников
Забронировать автомобиль

Блоки страницы (базовые)
Шапка
Левый сайдбар
Базовая часть
Подвал

Модуль - контроль сотрудников (на объектах)
Модуль должен включать:
выбор ведущим инженером сотрудников в этот день
привязка сотрудников к предприятию
привязка сотрудников к оборудованию
выбор количества отработанных часов
выбор причины отсутствия на работе

Руководитель заходит на страницу - отметить сотрудников
Выбирает сотрудника
Помечает, что этот сотрудник работает на объекте ММЗ
Отмечает, что этот сотрудник работает на стенде ИФДС5594
Отмечает количество часов сотрудника на рабочем месте (можно интервалом по времени)
При необходимости отмечает несколько объектов (пока нет необходимости)
При необходимости указывает в поле ввода работы выполненные на объекте сотрудником.
Есть возможность отредактировать выбор за сегодня изменив часы, причины и т.д.

При выборе сотрудника и привязке его к объекту можно выбрать,
самостоятельно работает сотрудник или под управлением руководителя.

Если бригада выезжает с руководителем (и таих бригад 5 например),
то начальник в офисе способен посмотреть, какой инженер на каком объекте находится
и кто с ним работает на данном объекте (какие сотрудники)

Начальник способен делать выгрузку по рабочим часам сотрудника за месяц
Количество пропусков, причины отстутсвия на рабочем месте.

Автоматически просчитывать ЗП исходя из тарифной ставки, учитывая пенсионный фонд,
ФСЗН, другие отчисления (пока считать необходимо только ЗП по тарифу)

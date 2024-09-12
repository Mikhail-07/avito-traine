# Проект: Marketplace Seller Dashboard

### Описание
Это веб-приложение для личного кабинета продавца на маркетплейсе, где реализован функционал управления объявлениями, просмотром заказов, а также работа с избранным.

### Проблемы, с которыми столкнулся и их решения

#### Чувствительность поиска к регистру:
При реализации поиска я столкнулся с тем, что поиск был чувствителен к регистру, что приводило к неудачным результатам при некорректном вводе. Чтобы решить эту проблему, я решил запрашивать весь список объявлений с сервера и фильтровать данные на клиентской стороне. Это позволило избежать ошибок при несовпадении регистра.

### Основные фичи и обоснование решений

#### Чувствительность объявлений к просмотрам и лайкам:

Учитывая, что объявления важны для пользователей, они чувствительны к количеству просмотров и лайкам. Поэтому я реализовал систему избранного, которая сохраняет лайки в localStorage. Это позволяет пользователям отслеживать свои предпочтения, даже если данные не синхронизируются с сервером.

#### Абсолютные пути:

Для удобства и лучшей структуры проекта я настроил абсолютные пути. Это реализовано через изменение опций компилятора в tsconfig.json и конфигурации Webpack с помощью react-app-rewired.

#### Тестирование:

Для обеспечения стабильности работы приложения я написал тесты, покрывающие фильтры и выдачу результатов. В ходе разработки я интегрировал библиотеку компонентов Ant Design, которая использует matchMedia. Для корректной работы тестов замокировал window.matchMedia в среде Jest.

#### Конфигурация проекта:

Использую config-overrides для настройки конфигурации сборки через react-app-rewired.

#### Отказ от стейт-менеджера:

Проект не очень большой, поэтому я решил отказаться от использования стороннего стейт-менеджера (например, Redux). Все изменения сразу передаются на сервер, что исключает необходимость сложного управления состоянием.

#### Линтер:

В проекте настроен линтер для поддержания качества кода и соблюдения стиля.

### Возможные улучшения

#### Кастомные компоненты и дизайн:

Можно улучшить дизайн приложения и добавить более качественные инфографические элементы для лучшего визуального восприятия.

#### Оптимизация хуков:

Возможна оптимизация кастомных хуков и объединение логики, например, хуков для фильтров.

#### Обработка ошибок:

Улучшить обработку ошибок, таких как отсутствие интернета, и отслеживание состояния доступности кнопок.

#### Оптимизация интерфейса:

Важно доработать пользовательский интерфейс, сделать его более дружелюбным и интуитивным.

### Не успел реализовать

#### Docker:

Планировал добавить Docker для контейнеризации, но не хватило времени.

#### Кнопка "Вперед":

На данный момент кнопка "Вперед" доступна, даже если больше нет объявлений. Нужно доработать логику управления этой кнопкой.


#### Архитектура
Проект построен по принципу фиче-ориентированной архитектуры (feature-based architecture). Этот подход позволяет эффективно масштабировать проект, разделять логику по функциональным блокам и упрощает навигацию и рефакторинг.

# Запуск проекта

npx json-server --watch db.json --port 3000 - запуск сервера на 3000 порту

npm start - запуск проекта в дев режиме

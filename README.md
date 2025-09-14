<img width="1919" height="1073" alt="image" src="https://github.com/user-attachments/assets/a87280aa-36e1-41d2-9d8c-a3986cf52e26" />

# Matcher Prototype (React + TS + Vite)

Интерактивный прототип для сопоставления элементов в двух колонках c линиями,
drag & drop (pointer events), сохранением состояния и адаптивной версткой.

## Запуск

- Установить зависимости: `pnpm i` (или `npm i`)
- Старт dev-сервера: `pnpm dev` (или `npm run dev`)
- Проверить код линтером: `pnpm lint`
- Собрать проект: `pnpm build`

## Как пользоваться

- Перетягивайте элементы между колонками, чтобы создать пару.
- Клик по линии удаляет пару. Наверху есть чипы текущих пар — по ним тоже можно удалить пару.
- Кнопки: `Save` (сохранить пары в localStorage), `Load` (восстановить), `Clear` (очистить пары и localStorage).
- Мобильные устройства поддерживаются (pointer events).

## Архитектура (FSD-образно)

- `src/features/matcher/ui/Matcher.tsx` — UI без бизнес-логики расчёта координат.
- `src/features/matcher/types.ts` — типы `Line`, `DragState` (тип `Pair` вынесен в `src/entities/match/types.ts`).
- `src/features/matcher/model/pairing.ts` — валидаторы и операции над парами (`canPair`, `removePair`).
- `src/features/matcher/lib/coords.ts` — расчет координат элементов относительно контейнера.
- `src/pages/home/ui/HomePage.tsx` — страница, стейт пар + кнопки сохранения.

## Критерии качества (как закрыты)

- Код/TS: типы вынесены в `types.ts`, логика в `model`, UI чистый; строгая типизация включена.
- Функциональность: drag & drop на pointer events, линии между элементами,
  удаление, проверка уникальности пары, сохранение/восстановление.
- Производительность: измерение позиций в `useLayoutEffect`; throttle обновлений линии через `requestAnimationFrame`;
  слушатели событий — на `window`.
- UX/UI: понятные заголовки, чипы пар, hover/active состояния, адаптивная верстка 2 колонки.

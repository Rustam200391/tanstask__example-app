import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// pnpm add -D @tanstack/eslint-plugin-query

const queryClient = new QueryClient();
// Создание QueryClient: Создаем экземпляр QueryClient.
const container = document.getElementById("root"); // Получаем контейнер для рендеринга
const root =
  createRoot(
    container
  ); /*Используем createRoot для рендеринга приложения в элемент с id root.*/
// Создаем корень рендеринга
// в версиях реакт выше 18(узнать верснию - команда npm view react version) необходимо указывать код как на 6-12 и 10-15 стр.
root.render(
  <QueryClientProvider client={queryClient}>
    {/* Оборачиваем приложение в QueryClientProvider и передаем ему клиента
    queryClient, чтобы все компоненты имели доступ к возможностям React Query. */}
    {/* приложение инициализируется в index.js, создается клиент React Query, и
    приложение оборачивается в QueryClientProvider. */}
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);

// Импортирует необходимые модули и стили.
// Создает экземпляр QueryClient.
// Оборачивает компонент App в QueryClientProvider, чтобы предоставить доступ к React Query в приложении.

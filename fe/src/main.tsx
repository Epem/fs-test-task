import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

import 'tailwindcss/tailwind.css';

import { CartProvider } from 'contexts/cart';

import App from './App';

//redux store
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);


const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <CartProvider>
          <App />
        </CartProvider>
      </Provider>
    </StrictMode>
  );
}

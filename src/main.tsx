import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store.js"
import "./index.css"
import App from "./App.js"
import "rc-pagination/assets/index.css"
import { ErrorBoundary } from "./components/ui/error-boundary.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

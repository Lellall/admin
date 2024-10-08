import React from "react"
import { Provider } from "react-redux"
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { store } from "@/redux/store"

function renderWithProviders(
  ui:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal,
  { reduxStore = store, ...renderOptions } = {}
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <Provider store={reduxStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }
  return {
    store: reduxStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

// eslint-disable-next-line react-refresh/only-export-components, import/no-extraneous-dependencies
export * from "@testing-library/react"
export { renderWithProviders as render }

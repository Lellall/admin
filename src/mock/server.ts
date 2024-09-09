// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from "msw/node"
import { getHandlers } from "./handler"

export const server = setupServer(...getHandlers())

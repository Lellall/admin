// /* eslint-disable import/no-extraneous-dependencies */
// // import { setupServer } from "msw/node"
// import { http } from "msw"
// import { loginError401 } from "./mock-errors"
// import { LoginResponse } from "@/redux/auth/typings"

// const DELAY = 1200

// export const getHandlers = () => [...authHandlers]

// const authHandlers = [
//     http.post<any, LoginResponse>("/auth/login", async (req, res, ctx) => {
//         const user = await req.json()
//         const isValid =
//             user.email === "mujtaba@gmail.com" && user.password === "1234567"
//         return res(
//             ctx.delay(DELAY),
//             ctx.status(isValid ? 200 : 401),
//             ctx.json(isValid ? {} : loginError401)
//         )
//     }),
// ]

import { fireEvent, screen } from "@testing-library/dom"
import { it, describe } from "vitest"
import Login from "../login.component"
import { render, act } from "@/utils/test-util"

describe("test user authentication", async () => {
    it("should", async () => {
        render(<Login />)
        const button = screen.getByRole("button", { name: "LOGIN" })

        await act(async () => {
            fireEvent.click(button)
            // Any asynchronous state updates or effects should be handled here
        })

        // expect the login response of user data after button click and api call is make ;
        // Get all you want in one store!
        // await waitFor(() => {
        //     expect(screen.getByText("a")).toBeInTheDocument()
        // })
    })
})

import { expect, describe } from "vitest"
import { screen } from "@testing-library/dom"
import Restaurant from "./restaurant"
import { renderWithProviders } from "@/utils/test-util"

describe("Testing restaurant landing page", () => {
    test("renders restaurant component", () => {
        renderWithProviders(<Restaurant />)
        expect(screen.getByRole("button", { name: "Get Started" }))
    })
})

import { it, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import HelloWorld from "./Hello"

describe("group", () => {
    it("should", () => {
        expect(1).toBeTruthy()
    })
    it("render hello world", () => {
        render(<HelloWorld />)
        const heading = screen.getByRole("heading")
        expect(heading).toBeDefined()
        expect(heading).toHaveTextContent(/hello world/i)
    })
})

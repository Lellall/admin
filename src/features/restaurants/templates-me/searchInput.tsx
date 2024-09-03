import React, { useState } from "react"
import AsyncSelect from "react-select/async"
import debounce from "lodash.debounce"
import styled from "styled-components"
import { configUrl } from "@/utils/config"

function SearchComponent({
    setSelectedProducts,
}: {
    setSelectedProducts: (p: any) => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    const fetchOptions = async (
        inputValue: string,
        callback: (item: any) => void
    ) => {
        setIsLoading(true)

        try {
            const response = await fetch(
                `${configUrl.BACKEND_URL}/products?page=0&size=10&filter=${inputValue}`
            )
            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                )
            }

            if (data.data.length === 0) {
                callback([])
            } else {
                const options = data.data.map((option: any) => ({
                    id: option.id,
                    label: option.name,
                    price: option.price,
                }))
                callback(options)
            }
        } catch (error) {
            //   console.error("Error fetching options:", error);
            callback([])
        } finally {
            setIsLoading(false)
        }
    }

    const debouncedFetchOptions = debounce(fetchOptions, 250)

    const handleSelectChange = (selectedOption: any) => {
        if (selectedOption) {
            setSelectedProducts((prevProducts: any) => [
                ...prevProducts,
                { ...selectedOption, quantity: 1 },
            ])
        }
    }

    return (
        <ResponsiveCard>
            <AsyncSelect
                onChange={handleSelectChange}
                loadOptions={debouncedFetchOptions}
                placeholder="Search for a product..."
                isClearable
                isSearchable
                isLoading={isLoading}
            />
        </ResponsiveCard>
    )
}

export default SearchComponent

const ResponsiveCard = styled.div`
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    @media only screen and (max-width: 767px) {
        max-width: 250px;
    }
`

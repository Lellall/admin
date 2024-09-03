import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import styled from "styled-components"
import InputComponent from "@/components/Inputs/input-component"
import SearchComponent from "./searchInput"
import { formatCurrency } from "@/utils/helpers"
import { useCreateTemplateMutation } from "@/redux/templates/template.api"

function CreateTemplate() {
    const [selectedProducts, setSelectedProducts] = useState([])
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Templatechema),
    })

    const handleFormSubmit = (data: any) => {
        // eslint-disable-next-line no-console
        console.log(data)
        createTemplate(data)
    }

    const handleRemoveProduct = (productId: string) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.filter((product) => product.value !== productId)
        )
    }

    const [createTemplate, { isLoading }] = useCreateTemplateMutation()
    const buttonTitle = isLoading ? "Loading..." : "Submit"
    const handleQuantityChange = (productId: string, change: number) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.value === productId
                    ? {
                          ...product,
                          quantity: Math.max(
                              1,
                              (product.quantity || 1) + change
                          ),
                      }
                    : product
            )
        )
    }
    // eslint-disable-next-line no-console
    // console.log(selectedProducts);
    return (
        <div>
            <h1>Create templates</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    <InputComponent
                        errorMessage={errors?.name?.message}
                        name="name"
                        control={control}
                        label="Template Name"
                    />
                </div>
                <div className="mt-10">
                    <SearchComponent
                        setSelectedProducts={setSelectedProducts}
                    />
                    <SelectedProductsList>
                        <h3>Selected Products:</h3>
                        {selectedProducts.map((product) => (
                            <ProductItem key={product.value}>
                                <span>
                                    {product.label} -{" "}
                                    {formatCurrency(product.price)}
                                </span>
                                <div className="flex m-2 w-[30%] items-center justify-around">
                                    <QuantityControl>
                                        <Button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product.value,
                                                    -1
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                        <Quantity>
                                            {product.quantity || 1}
                                        </Quantity>
                                        <Button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product.value,
                                                    1
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </QuantityControl>
                                    <RemoveButton
                                        onClick={() =>
                                            handleRemoveProduct(product.value)
                                        }
                                    >
                                        Remove
                                    </RemoveButton>
                                </div>
                            </ProductItem>
                        ))}
                    </SelectedProductsList>
                    <SubmitButton disabled={isLoading}>
                        {buttonTitle}
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}

export default CreateTemplate

const Templatechema = yup.object().shape({
    name: yup.string().required("Template name is required"),
})

const SubmitButton = styled.button`
    background: #195d37;
    padding: 5px;
    min-width: 100px;
    color: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    float: right;
    margin-top: 10px;
`
const SelectedProductsList = styled.div`
    width: 100%;
    /* max-width: 400px; */
    /* background: coral; */
`

const ProductItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
`

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    /* background: red; */
`

const Button = styled.button`
    background-color: #195d37;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #357abd;
    }
`

const Quantity = styled.span`
    margin: 0 10px;
`

const RemoveButton = styled.button`
    background-color: #f06d05;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #eb8383;
    }
`

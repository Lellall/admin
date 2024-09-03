import { Trash } from "iconsax-react"
import React, { useState, useEffect } from "react"
import empty from "../../assets/empty.svg"
import SearchComponent from "./components/searchInput"
import { useCreateTemplateMutation } from "@/redux/templates/template.api"

type Product = {
    id: number
    name: string
    price: number
}

type SelectedProduct = Product & {
    quantity: number
    label?: string
}

function ProductSearch() {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
        []
    )
    const [subtotal, setSubtotal] = useState<number>(0)
    const [fileName, setFileName] = useState<string>("Untitled")
    useEffect(() => {
        const newSubtotal = selectedProducts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        )
        setSubtotal(newSubtotal)
    }, [selectedProducts])

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setSelectedProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
        )
    }

    const handleDeleteProduct = (id: number) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== id))
    }

    const [createTemplate, { isLoading }] = useCreateTemplateMutation()

    const handleFormSubmit = () => {
        const existingTemplateDTO = selectedProducts.map((product) => ({
            productId: product.id.toString(),
            quantity: product.quantity,
        }))

        const dataToSubmit = {
            name: fileName,
            existingTemplateItemsDto: existingTemplateDTO,
            nonExistingTemplateItems: existingTemplateDTO,
        }
        createTemplate(dataToSubmit)
    }
    const buttonTitle = isLoading ? "Loading..." : "Submit"
    return (
        <div className="p-4 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="rounded px-1 py-2"
                    placeholder="Untitled"
                    style={{ border: "none", fontSize: "32px" }}
                />
            </div>

            <SearchComponent setSelectedProducts={setSelectedProducts} />

            {selectedProducts.length > 0 ? (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-4">
                        Selected Products
                    </h2>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">
                                    Product Name
                                </th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Quantity</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">
                                        {product.label}
                                    </td>
                                    <td className="border px-4 py-2">
                                        ${product.price}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            min="1"
                                            className="border rounded px-2 py-1"
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    product.id,
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteProduct(product.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            aria-label="Delete product"
                                        >
                                            <Trash size="22" color="#FF8A65" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-lg font-bold">
                            Subtotal: ${subtotal.toFixed(2)}
                        </div>
                        <div className="text-lg font-bold">
                            Total: ${subtotal.toFixed(2)}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleFormSubmit}
                        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    >
                        {buttonTitle}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="">
                        <img src={empty} alt="image_" />
                    </div>
                    <div className="text-center text-lg font-semibold text-gray-600">
                        🛒{" "}
                        <span className="text-green-600">
                            No products added to your cart yet!
                        </span>{" "}
                        Start browsing and add items to place your order. 🛒
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductSearch

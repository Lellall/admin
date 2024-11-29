import styled from "styled-components"
import { useState } from "react"
import { BackSquare, DocumentUpload, Trash } from "iconsax-react"
import { useDeleteInventoryMutation } from "@/redux/inventory/inventory.api"

const ModInput = styled.input`
  width: 90px;
  border: none;
  &:focus {
    border: none;
  }
`

const Table = ({ products, onUpdateInv, isUpdatingInv, shopId, showAsList }) => {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [editedProducts, setEditedProducts] = useState([])
  const [deleteAll, setDeleteAll] = useState(false)
  const [onDeleteInv, { isLoading: deletingInv }] = useDeleteInventoryMutation()

  function transformData(data) {
    return {
      items: data.map((item) => ({
        itemId: item.id,
        used: parseInt(item.used, 10) || 0,
        total: item.total || 0,
        unitPrice: parseFloat(item.price) || 0,
      })),
    }
  }
  function transformDataForDelete(data) {
    return {
      itemIds: data.map((item) => item.id),
    }
  }

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.some((selectedProduct) => selectedProduct.id === product.id)
        ? prevSelected.filter((selectedProduct) => selectedProduct.id !== product.id)
        : [...prevSelected, product]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === products?.data?.length) {
      setSelectedProducts([])
      setDeleteAll(false)
    } else {
      setSelectedProducts(products?.data)
      setDeleteAll(true)
    }
  }

  const handleEditProduct = (id, field, value) => {
    setEditedProducts((prevEdited) => {
      const existingProduct = prevEdited.find((product) => product.id === id)
      if (existingProduct) {
        return prevEdited.map((product) => (product.id === id ? { ...product, [field]: value } : product))
      } else {
        const productToEdit = products.data.find((product) => product.id === id)
        handleSelectProduct(productToEdit)
        return [...prevEdited, { ...productToEdit, [field]: value }]
      }
    })
  }

  const handleUndoEdit = (id) => {
    setEditedProducts((prevEdited) => prevEdited.filter((product) => product.id !== id))
    setSelectedProducts((prevSelected) => prevSelected.filter((selectedProduct) => selectedProduct.id !== id))
  }

  const handleUpdateProduct = (id) => {
    const productToUpdate = editedProducts.find((p) => p.id === id)
    if (productToUpdate) {
      const data = { data: transformData([productToUpdate]), shopId }
      onUpdateInv(data)
    }
  }

  const onUpdateAll = () => {
    const res = transformData(editedProducts)
    const data = { data: res, shopId }
    onUpdateInv(data)
  }

  const onDelete = () => {
    const res = transformDataForDelete(selectedProducts)
    const data = { data: res, shopId }

    onDeleteInv(data)
  }

  return (
    <div className="overflow-x-auto">
      {!showAsList && (
        <div className="flex flex-col md:flex-row justify-end mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={() => onDelete(selectedProducts)}
            className={`bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition 
        ${isUpdatingInv ? "cursor-wait" : ""} 
        ${selectedProducts.length < 1 || deletingInv ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
            disabled={selectedProducts.length < 1 || deletingInv}
          >
            Delete Selected
          </button>
          <button
            onClick={onUpdateAll}
            className={`bg-purple-500 text-white px-4 py-2 rounded shadow transition 
        ${isUpdatingInv ? "cursor-wait" : ""} 
        ${editedProducts.length === 0 || isUpdatingInv ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
            disabled={editedProducts.length === 0 || isUpdatingInv}
          >
            {isUpdatingInv ? "Updating..." : "Update Changes"}
          </button>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead className="border-b">
          <tr>
            {!showAsList && (
              <>
                <th className="px-6 py-3 border-gray-300">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products?.data?.length}
                    onChange={handleSelectAll}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Products
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Opening Stock
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Added
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  QTY Used
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Closing Stock
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Unit Price
                </th>
                <th className="px-6 py-3 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {products?.data?.map((product) => {
            const total = product.total
            const closingStock = product.count
            const isSelected = selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)
            const editedProduct = editedProducts.find((p) => p.id === product.id) || product

            return (
              <tr
                key={product.id}
                className={`border-b border-gray-200 hover:bg-green-100 ${isSelected ? "bg-green-200" : ""}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectProduct(product)}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src={product.imageUrl} alt={product.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.newlyAdded}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!showAsList ? (
                    <ModInput
                      type="number"
                      min={0}
                      max={total}
                      value={editedProduct.used}
                      onChange={(e) => handleEditProduct(product.id, "used", e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{closingStock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!showAsList ? (
                    <ModInput
                      type="number"
                      min={0}
                      value={editedProduct.unitPrice}
                      onChange={(e) => handleEditProduct(product.id, "unitPrice", e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-4 flex py-4 whitespace-nowrap text-sm text-gray-500">
                  {!showAsList ? (
                    <>
                      {editedProducts.some((p) => p.id === product.id) && (
                        <>
                          <button
                            onClick={() => handleUndoEdit(product.id)}
                            className="text-red-500 mx-3 hover:underline"
                          >
                            <BackSquare size="22" color="purple" />
                          </button>
                          <button
                            onClick={() => handleUpdateProduct(product.id)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            {isUpdatingInv ? (
                              <span className="animate-spin">🔄</span>
                            ) : (
                              <DocumentUpload size="22" color="blue" />
                            )}
                          </button>
                        </>
                      )}
                      <button onClick={() => onDelete(product.id)} className="text-blue-500 hover:underline mr-2">
                        {deletingInv ? <span className="animate-spin">🔄</span> : <Trash size="22" color="red" />}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table

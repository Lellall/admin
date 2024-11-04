import Modal from "@/components/modal"
import { useDeleteShopMutation } from "@/redux/shops/shops.api"
import { useEffect } from "react"

interface DeleteModalProps {
  isModalOpen: boolean
  toggleModal: () => void
  shopId: string | null
}

function DeleteModal({ isModalOpen, toggleModal, shopId }: DeleteModalProps) {
  const [deleteShop, { isLoading: isDeleting, isSuccess }] = useDeleteShopMutation()
  useEffect(() => {
    if (isSuccess) {
      toggleModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <div>
      <Modal width="500px" show={isModalOpen} onClose={toggleModal} title="Delete Template">
        <p>Are you sure you want to permanently delete this retaurant?</p>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={toggleModal}
            className="bg-[#0E5D37] text-white min-w-[100px] py-2 px-4 rounded hover:bg-green-700"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => {
              deleteShop({ shopId: shopId ?? "" })
            }}
            className="bg-[#5d1b0e] text-white  min-w-[100px]  py-2 px-4 rounded hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal

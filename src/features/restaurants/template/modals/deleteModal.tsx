import Modal from "@/components/modal"
import { useDeleteTemplateMutation } from "@/redux/templates/template.api"
import { useEffect } from "react"

interface DeleteModalProps {
  isModalOpen: boolean
  toggleModal: () => void
  shopId: string | null
  templateId: string
}

function DeleteModal({ isModalOpen, toggleModal, shopId, templateId }: DeleteModalProps) {
  const [deleteTemplate, { isLoading: isDeleting, isSuccess }] = useDeleteTemplateMutation()

  useEffect(() => {
    if (isSuccess) {
      toggleModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <div>
      <Modal width="500px" show={isModalOpen} onClose={toggleModal} title="Delete Template">
        <p>Are you sure you want to permanently delete this template?</p>

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
              deleteTemplate({ shopId: shopId ?? "", templateId: templateId })
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

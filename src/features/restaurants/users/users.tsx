import Button from "@/components/button/button"
import { Add } from "iconsax-react"
import styled from "styled-components"
import PrivilegesModal from "./modals/privilegesModal"
import { useState } from "react"
import Text from "@/components/text/Text"
import { useGetShopUsersQuery } from "@/redux/shops/shops.api"
import { useAuthSlice } from "@/features/auth/auth.slice"
import { useNavigate } from "react-router-dom"
import { appPaths } from "@/components/layout/app-paths"
import Modal from "@/components/modal"
import CreateUser from "./modals/createUserModal"

function Users() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { user, isAuthenticated } = useAuthSlice()

  const { data } = useGetShopUsersQuery({ shopId: user?.id ?? "" })

  const toggled = () => {
    setIsModalOpen(!isModalOpen)
  }
  const toggledCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }

  console.log(data)
  return (
    <div>
      <div className="flex justify-between my-5">
        <Text h1>Users</Text>
        <Button onClick={toggledCreateModal} loading={false} className={"flex  text-black border-2 border-[#125F3A]"}>
          <Add /> Create new user
        </Button>
      </div>
      <div>
        <input type="search" className="my-3 p-3 w-full outline-none bg-[#34A8530F]" placeholder="Search user" />
      </div>
      <Table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Privilegs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>
              <span
                onClick={toggled}
                className="bg-[#0E5D3726]  text-[#3F7E60]  text-center block text-sm rounded-lg p-1 cursor-pointer w-[70px]"
              >
                View
              </span>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>janesmith@example.com</td>
            <td>
              <span
                onClick={toggled}
                className="bg-[#0E5D3726] text-[#3F7E60]  text-center block text-sm rounded-lg p-1 cursor-pointer w-[70px]"
              >
                View
              </span>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Alice Johnson</td>
            <td>alicejohnson@example.com</td>
            <td>
              <span
                onClick={toggled}
                className="bg-[#0E5D3726] text-[#3F7E60]  text-center block text-sm rounded-lg p-1 cursor-pointer w-[70px]"
              >
                View
              </span>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Bob Brown</td>
            <td>bobbrown@example.com</td>
            <td>
              <span
                onClick={toggled}
                className="bg-[#0E5D3726] text-[#3F7E60]  text-center block text-sm rounded-lg p-1 cursor-pointer w-[70px]"
              >
                View
              </span>
            </td>
          </tr>
        </tbody>
      </Table>

      <PrivilegesModal onclose={toggled} show={isModalOpen} />
      <Modal
        style={{ maxWidth: "600px", paddingBottom: "3rem" }}
        onClose={toggledCreateModal}
        title="Create User"
        show={isCreateModalOpen}
      >
        <>
          <CreateUser />
        </>
      </Modal>
    </div>
  )
}

export default Users

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #a2a0a03b;
  border-radius: 18px;
  thead tr th {
    background-color: #3096652b;
    border: 1px solid #ddd;
    padding: 8px;
    color: #0e5d37;
    text-align: left;
  }
  tr td {
    border: 1px solid #3096652b;
    padding: 8px;
    text-align: left;
  }
`

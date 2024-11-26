import { Add } from "iconsax-react"
import styled from "styled-components"
import PrivilegesModal from "./modals/privilegesModal"
import { useState } from "react"
import Text from "@/components/text/Text"
import { useGetShopsQuery, useGetShopUsersQuery } from "@/redux/shops/shops.api"
import Modal from "@/components/modal"
import CreateUser from "./modals/createUserModal"
import Select from "react-select"
import { capitalizeFirstLetterOFEachWord } from "@/utils/helpers"
import Skeleton from "react-loading-skeleton"
import { usePrivileges } from "@/components/privileges"
// import { useDebounce } from "react-use"

function Users() {
  // const [name, setName] = useState("")
  // const [searchName, setSearchName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shopId, setShop] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { data: shops, isLoading: isLoadingShop } = useGetShopsQuery({
    page: 0,
    size: 10,
    categoryId: "",
    filter: "",
  })
  const { hasAllPrivileges } = usePrivileges()
  const { data, isLoading } = useGetShopUsersQuery({ shopId: shopId ?? "" })

  // useDebounce(
  //   () => {
  //     setSearchName(name)
  //   },
  //   2000,
  //   [name]
  // )

  const toggled = () => {
    setIsModalOpen(!isModalOpen)
  }
  const toggledCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "300px",
      minWidth: "250px",
      marginBottom: "15px",
    }),
    control: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
  }

  // useEffect(() => {
  //   if (shopId) {
  //     refetch()
  //   }
  // }, [shopId, refetch])

  return (
    <div>
      <div className="flex justify-between my-5">
        <Text h1>Users</Text>
        {hasAllPrivileges(["c:user"]) && (
          <button
            disabled={!shopId}
            onClick={toggledCreateModal}
            className={`flex items-center
          ${shopId ? "bg-[#125F3A]" : "bg-[#0E5D3726]"} 
          p-1 
          rounded-md 
          ${shopId ? "text-[#fff]" : "text-[#000]"} 
          ${shopId ? "border" : ""} 

       
          border-[#125F3A]`}
          >
            <Add />
            Create new user
          </button>
        )}
      </div>

      <div className="flex items-center flex-wrap justify-between">
        <>
          <Select
            placeholder="Select shop"
            onChange={(e) => {
              setShop(e?.value ?? "")
            }}
            isLoading={isLoadingShop}
            styles={customStyles}
            options={shops?.data.map((shop) => {
              return { label: shop.name, value: shop.id }
            })}
          />
        </>
        {/* <input
          type="search"
          className="my-3 p-3  w-[100%] md:w-[50%] outline-none  bg-[#34A8530F]"
          placeholder="Search user"
          // value={name}
          // onChange={(e) => setName(e.target.value)}
        /> */}
      </div>

      <>
        {isLoading ? (
          [1].map((el) => (
            <Skeleton key={el} count={1} baseColor="#cdd6de33" highlightColor="#5a626833" width="100%" height="80vh " />
          ))
        ) : data?.length ? (
          <Table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user.id}>
                  <td>{++index}</td>
                  <td>{capitalizeFirstLetterOFEachWord(`${user.firstName} ${user.lastName}`)}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : shopId ? (
          <>
            <div style={{ textAlign: "center", padding: "50px", color: "#555" }}>
              <h2>No data available</h2>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "50px", color: "#555" }}>
            <h2>Select a shop to find users </h2>
          </div>
        )}
      </>

      <PrivilegesModal onclose={toggled} show={isModalOpen} />
      <Modal
        style={{ maxWidth: "600px", paddingBottom: "3rem" }}
        onClose={toggledCreateModal}
        title="Create User"
        show={isCreateModalOpen}
      >
        <>
          <CreateUser shopId={shopId} toggleModal={toggledCreateModal} />
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

// export const Select = styled.select`
//   border: 1px solid #ccc;
//   /* margin-bottom: 20px; */
//   padding: 7px;
//   border-radius: 5px;
//   outline: none;
//   color: #000;
// `

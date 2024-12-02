import Button from "@/components/button/button"
import Modal from "@/components/modal"
import { useAddRoleMutation, usePrivilegesQuery } from "@/redux/roles-privileges/roles-privileges.api"
import { useEffect, useState } from "react"
import styled from "styled-components"

interface ModalProps {
  onclose: () => void
  show: boolean
  shopId: string
}

function PrivilegesModal({ onclose, show, shopId }: ModalProps) {
  const { data } = usePrivilegesQuery()
  const [addPrivileges, { isLoading: isAdding, isSuccess: isAdded }] = useAddRoleMutation()

  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([])
  const [roleName, setRoleName] = useState("")

  const handlePrivilegeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSelectedPrivileges(
      (prev) =>
        prev.includes(value)
          ? prev.filter((privilege) => privilege !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    )
  }

  const handleAddPrivileges = () => {
    const payloads = { name: roleName, privileges: selectedPrivileges, shopId: shopId }
    console.log(payloads)
    addPrivileges(payloads)
  }

  useEffect(() => {
    if (isAdded) {
      onclose()
    }
  }, [isAdded])

  return (
    <Modal onClose={onclose} show={show} title="Manage Privileges" width="80%">
      <div className="w-[100%] m-auto">
        <input
          onChange={(e) => setRoleName(e.target.value)}
          type="text"
          placeholder="Role name"
          className="border p-2 rounded-md w-full my-3 outline-none"
        />
        <div className="flex flex-wrap">
          {data?.map((role) => (
            <div key={role.id} className="m-1 border p-2 rounded-md">
              <h3>{role.name}</h3>
              {role.privileges.map((privilege) => (
                <RadioGroup key={privilege.id}>
                  <RadioLabel>
                    <RadioOption>
                      <input
                        type="checkbox"
                        name="privilege"
                        value={privilege.id}
                        checked={selectedPrivileges.includes(privilege.id)}
                        onChange={handlePrivilegeChange}
                      />
                    </RadioOption>
                    {privilege.name}
                  </RadioLabel>
                </RadioGroup>
              ))}
            </div>
          ))}
        </div>

        <Button className={"w-[100%] my-6"} loading={isAdding} onClick={handleAddPrivileges}>
          Update
        </Button>
      </div>
    </Modal>
  )
}

export default PrivilegesModal

const RadioGroup = styled.div`
  min-width: 50%;
  display: flex;
`

const RadioLabel = styled.label`
  display: block;
  gap: 1rem;
  display: flex;
  align-items: center;
`

const RadioOption = styled.div`
  gap: 4px;
`

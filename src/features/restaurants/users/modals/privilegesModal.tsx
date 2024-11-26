import Button from "@/components/button/button"
import Modal from "@/components/modal"
import styled from "styled-components"

interface ModalProps {
  onclose: () => void
  show: boolean
}

function PrivilegesModal({ onclose, show }: ModalProps) {
  return (
    <Modal onClose={onclose} show={show} title="" width="30%">
      <div className="w-[100%] m-auto">
        <RadioGroup>
          <RadioLabel>
            <RadioOption>
              <input type="radio" id="gender-male" value="male" />
            </RadioOption>
            Delete Shop
          </RadioLabel>
        </RadioGroup>
        <RadioGroup>
          <RadioLabel>
            <RadioOption>
              <input type="radio" id="gender-male" value="male" />
            </RadioOption>
            Generate Invoice
          </RadioLabel>
        </RadioGroup>
        <RadioGroup>
          <RadioLabel>
            <RadioOption>
              <input type="radio" id="gender-male" value="male" />
            </RadioOption>
            View Shops
          </RadioLabel>
        </RadioGroup>
        <RadioGroup>
          <RadioLabel>
            <RadioOption>
              <input type="radio" id="gender-male" value="male" />
            </RadioOption>
            Create Template
          </RadioLabel>
        </RadioGroup>
        <RadioGroup>
          <RadioLabel>
            <RadioOption>
              <input type="radio" id="gender-male" value="male" />
            </RadioOption>
            Delete Template{" "}
          </RadioLabel>
        </RadioGroup>

        <Button className={"w-[100%] my-6"} loading={false} onClick={onclose}>
          Update
        </Button>
      </div>
    </Modal>
  )
}

export default PrivilegesModal

const RadioGroup = styled.div`
  min-width: 50%;
`

const RadioLabel = styled.label`
  display: block;
  gap: 1rem;
  display: flex;
  align-items: center;
`

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

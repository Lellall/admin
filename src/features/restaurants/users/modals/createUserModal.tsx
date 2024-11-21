import { useCreateShopUserMutation } from "@/redux/shops/shops.api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(12),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
})

interface UserData {
  email: string
  password: string
  firstName: string
  lastName: string
}
const defaultValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

interface ModalProps {
  toggleModal: () => void
  shopId: string
}

function CreateUser({ shopId, toggleModal }: ModalProps) {
  const [createUser, { isLoading, isSuccess, data }] = useCreateShopUserMutation()

  const {
    register,
    handleSubmit,
    watch,
    // control,

    formState: { errors },
  } = useForm<UserData>({ defaultValues, resolver: yupResolver(schema) })
  const onSubmit = (data: UserData) => {
    createUser({ data: data, shopId: shopId ?? "" })
  }

  useEffect(() => {
    if (isSuccess) {
      toggleModal()
    }
  }, [isSuccess])

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="grid  grid-cols-2 gap-2">
        <InputWrapper>
          <Input type="text" value={watch("firstName")} {...register("firstName")} placeholder="First Name" />
          {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.firstName?.message}</span>}
        </InputWrapper>
        <InputWrapper>
          <Input type="text" value={watch("lastName")} {...register("lastName")} placeholder="Last Name" />
          {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.lastName?.message}</span>}
        </InputWrapper>
        <InputWrapper>
          <Input type="text" value={watch("email")} {...register("email")} placeholder="Email address" />
          {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.email?.message}</span>}
        </InputWrapper>
        <InputWrapper>
          <Input type="text" value={watch("password")} {...register("password")} placeholder="Password" />
          {errors && <span style={{ color: "red", fontSize: "12px" }}>{errors?.password?.message}</span>}
        </InputWrapper>
        <Input
          className="col-span-2 bg-[#125F3A] text-white"
          type="Submit"
          value={isLoading ? "Submitting..." : "Submit"}
        />
      </form>
    </div>
  )
}

export default CreateUser

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 10px;
  span {
    display: inline-block;
    margin: 0px;
    padding: 0px;
  }
`
const Input = styled.input`
  padding: 7px;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #ccc;
  outline: none;
  box-sizing: border-box;
`

export const Select = styled.select`
  border: 1px solid #ccc;
  /* margin-bottom: 20px; */
  padding: 7px;
  border-radius: 5px;
  outline: none;
  color: #000;
`

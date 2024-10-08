import React from "react"
import { Controller, useForm } from "react-hook-form"
import { MessageText, Mobile, Unlock, User } from "iconsax-react"
// import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "@/redux/auth/auth-api"
import InputWithIcon from "@/components/Inputs/input"

interface UserDataProps {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword?: string
}

export function Register() {
  const [register, { isLoading }] = useRegisterMutation()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm()
  // const navigate = useNavigate()
  const handleRegister = async (data: UserDataProps) => {
    try {
      await register({
        data,
        role: "CONSUMER",
        platformType: "WEB",
      }).unwrap()
      // dispatch(setAuth(true));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to login:", err)
    }
  }
  const onSubmit = (data: UserDataProps) => {
    handleRegister(data)
  }

  const password = watch("password", "")
  return (
    <div className="mt-20">
      <div className="text-center mt-30 mb-5" style={{ marginTop: "11rem" }}>
        <span
          style={{
            color: "rgb(51, 51, 51)",
            fontSize: "24px",
            fontWeight: 300,
          }}
        >
          Sign Up
        </span>
        <br />
        <span
          className="mt-5"
          style={{
            color: "#AAAAAA",
            fontSize: "16px",
            fontWeight: 300,
          }}
        >
          Create Your Account - Sign Up Now
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-sm m-auto sm:w-full">
        <div className="items-center flex flex-col sm:flex-row mx-4 justify-between ">
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First name is required",
              }}
              render={({ field }) => (
                <InputWithIcon
                  icon={User}
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  {...field}
                  hasError={errors.firstName && errors.firstName.message}
                  errorMessage={errors.firstName && errors.firstName.message}
                />
              )}
            />
          </div>
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last name is required",
              }}
              render={({ field }) => (
                <InputWithIcon
                  icon={User}
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  {...field}
                  hasError={errors.lastName && errors.lastName.message}
                  errorMessage={errors.lastName && errors.lastName.message}
                />
              )}
            />
          </div>
        </div>
        <div className="items-center flex flex-col sm:flex-row mx-4 justify-between ">
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11,14}$/,
                  message: "Phone number must be between 11 and 14 digits and only number.",
                },
              }}
              render={({ field }) => (
                <InputWithIcon
                  icon={Mobile}
                  label="Phone Number"
                  type="text"
                  placeholder="Enter your phone number"
                  {...field}
                  hasError={errors.phoneNumber && errors.phoneNumber.message}
                  errorMessage={errors.phoneNumber && errors.phoneNumber.message} // Changed 'phone' to 'phoneNumber'
                />
              )}
            />
          </div>
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputWithIcon
                  hasError={errors.email && errors.email.message}
                  icon={MessageText}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  // hasError={errors.email ? true : false}
                  errorMessage={errors.email && errors.email.message}
                />
              )}
            />
          </div>
        </div>
        <div className="items-center flex flex-col sm:flex-row mx-4 justify-between ">
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, and one number",
                },
              }}
              render={({ field }) => (
                <InputWithIcon
                  icon={Unlock}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  hasError={!!errors.password}
                  errorMessage={errors.password && errors.password.message}
                />
              )}
            />
          </div>
          <div className="w-full mx-4 my-2 sm:my-0 sm:w-1/2 ">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) => value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <InputWithIcon
                  icon={Unlock}
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  hasError={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword && errors.confirmPassword.message}
                />
              )}
            />
          </div>
        </div>
        <div className="mx-8 mt-4 my-2 sm:my-0">
          <button
            disabled={isLoading}
            className="bg-green-800 hover:bg-[#0e5737] text-white w-full mt-4 py-2 px-4 rounded-full"
          >
            REGISTER
          </button>
        </div>
      </form>
      <hr className="my-6 mx-10 border-t border-gray-300" />
      <div className="text-center mb-5">
        <span
          className="mt-5"
          style={{
            color: "#AAAAAA",
            fontSize: "16px",
            textAlign: "center",
            fontWeight: 300,
            cursor: "pointer",
          }}
        >
          Already have an account ? Login.
        </span>
      </div>
    </div>
  )
}

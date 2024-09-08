import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { MessageText, Unlock } from "iconsax-react"
import { useNavigate } from "react-router-dom"
import InputWithIcon from "@/components/Inputs/input"
import { useLoginMutation } from "@/redux/auth/auth-api"

interface LoginData {
    email: string
    password: string
}

function Login(): React.ReactElement {
    const navigate = useNavigate()

    const [login, { isLoading, isSuccess }] = useLoginMutation()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const handleLogin = async ({ email, password }: LoginData) => {
        login({ email, password, role: "RESTAURANT" })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/restaurant")
        }
    }, [isSuccess, navigate])

    return (
        <div className="min-h-fit flex flex-col items-center m-auto w-full ">
            <div className="text-center mb-5">
                <span
                    style={{
                        color: "rgb(51, 51, 51)",
                        fontSize: "24px",
                        fontWeight: 300,
                    }}
                >
                    Login
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
                    Log in with your credentials
                </span>
            </div>
            <form
                className="w-full max-w-screen-sm m-auto"
                onSubmit={handleSubmit(handleLogin)}
            >
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
                            icon={MessageText}
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            hasError={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 8 characters long",
                        },
                    }}
                    render={({ field }) => (
                        <InputWithIcon
                            icon={Unlock}
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            hasError={!!errors.password}
                            errorMessage={errors.password?.message as string}
                        />
                    )}
                />
                <div className="flex">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                navigate("/forgot-password")
                            }
                        }}
                        className="ml-auto my-2 text-blue-500"
                        style={{ fontSize: "12px", cursor: "pointer" }}
                        type="button"
                    >
                        Forgot Password?
                    </button>
                </div>
                <button
                    disabled={isLoading}
                    className="bg-green-800 hover:bg-[#0e5737] text-white w-full mt-4 py-2 px-4 rounded-full"
                    type="submit"
                >
                    {isLoading ? "Logging in..." : " LOGIN"}
                </button>
            </form>
            <hr className="my-6 border-t border-gray-300" />
        </div>
    )
}

export default Login

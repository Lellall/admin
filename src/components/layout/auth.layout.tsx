import React from "react"
import logo from "../../../public/vite.svg"

export interface AuthLayoutProps {
    children: React.ReactNode
}
function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex ">
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center bg-orange-500"
                style={{
                    backgroundImage:
                        "url(https://lellall-prod.sfo3.cdn.digitaloceanspaces.com/files/fresh.svg)",
                }}
            />
            <div className=" sm:w-full lg:w-1/2 w-full flex justify-center items-center relative">
                <div className="w-[70%]">
                    <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2">
                        <img src={logo} alt="logo" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

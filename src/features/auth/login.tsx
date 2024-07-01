import React from 'react';
import { Controller, useForm } from "react-hook-form";
import InputWithIcon from '../../components/input'
import { MessageText, Unlock } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './auth.api';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const [login, { isLoading }] = useLoginMutation();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleLogin = async ({ email, password }: any) => {
        try {
            await login({ email, password, role: "CONSUMER" }).unwrap();
            // dispatch(setAuth(true));
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };
    const onSubmit = (data: any) => {
        console.log(data);

        handleLogin(data)
    };
    return (
        <div className="">
            <div className="text-center mb-5">
                <span style={{
                    color: 'rgb(51, 51, 51)',
                    fontSize: '24px',
                    fontWeight: 300,
                }}>Login</span>
                <br />
                <span className='mt-5' style={{
                    color: '#AAAAAA',
                    fontSize: '16px',
                    fontWeight: 300,
                }}>Log in with your credentials</span>
            </div>
            <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
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
                            {...field}
                            hasError={errors.email ? true : false}
                            errorMessage={errors.email && errors.email.message}
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
                            message: "Password must be at least 8 characters long",
                        },
                        // @ts-ignore
                        pattern: {
                            message:
                                "Password must contain at least one special character (!@#$%^&*)",
                        },
                    }}
                    render={({ field }) => (
                        <InputWithIcon
                            icon={Unlock}
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            hasError={errors.password ? true : false}
                            errorMessage={errors.password && errors.password.message}
                        />
                    )}
                />
                <div className="flex">
                    <div onClick={() => navigate('/forgot-password')}  className="ml-auto my-2 text-blue-500" style={{ fontSize: '12px', cursor: 'pointer' }}>
                        Forgot Password?
                    </div>
                </div>
                <button disabled={isLoading} className="bg-green-800 hover:bg-[#0e5737] text-white w-full mt-4 py-2 px-4 rounded-full">
                    LOGIN
                </button>
            </form>
            <hr className="my-6 border-t border-gray-300" />
            <div onClick={() => navigate('/register')} className="text-center mb-5">
                <span className='mt-5' style={{
                    color: '#AAAAAA',
                    fontSize: '16px',
                    textAlign: 'center',
                    fontWeight: 300,
                    cursor: 'pointer'
                }}>Don't have an account ?, sign up!.</span>
            </div>
        </div>
    );
};

export default Login;

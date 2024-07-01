import React from 'react';
import { Controller, useForm } from "react-hook-form";
import InputWithIcon from '../../components/input'
import { MessageText, Unlock, User } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './auth.api';
import { useNavigate } from 'react-router-dom';


const ForgotPassword: React.FC = () => {
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
            {/* <div className="text-center mb-5">
                <span style={{
                    color: 'rgb(51, 51, 51)',
                    fontSize: '24px',
                    fontWeight: 300,
                }}>Forgot Password?</span>
                <br />
                <span className='mt-5' style={{
                    color: '#AAAAAA',
                    fontSize: '16px',
                    fontWeight: 300,
                }}>Enter your email below, we will send a password reset link to
                    your email.</span>
            </div> */}
            <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex text-center mb-5 flex-col sm:flex-row mx-4">
                    <span style={{
                        color: 'rgb(51, 51, 51)',
                        fontSize: '24px',
                        fontWeight: 300,
                        textAlign:'center'
                    }}>Forgot Password?</span>
                </div>
                <div className="flex flex-col sm:flex-row mx-4">
                    <div className="mx-4 my-2 sm:my-0">
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
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row mx-8">
                    <button disabled={isLoading} className="bg-green-800 hover:bg-[#0e5737] text-white w-full mt-4 py-2 px-4 rounded-full">
                        SEND LINK
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;

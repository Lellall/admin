/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputWithIcon from '../../components/Inputs/input';
import { MessageText } from 'iconsax-react';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useRequestPasswordResetMutation } from '../../redux/auth';

const ForgotPassword: React.FC = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [reset, { isLoading }] = useRequestPasswordResetMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async (email: any) => {
    await reset(email).unwrap();
  };

  return (
    <form className=" box-border w-full " onSubmit={handleSubmit(handleResetPassword)}>
      <div className="flex text-center mb-5 flex-col m:flex-row mx-4">
        <span
          style={{
            color: 'rgb(51, 51, 51)',
            fontSize: '24px',
            fontWeight: 300,
            textAlign: 'center',
          }}>
          Forgot Password?
        </span>
      </div>
      <div className="flex flex-col sm:flex-row mx-4">
        <div className=" w-full mx-4 my-2 sm:my-0">
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
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
      <div className="flex flex-col sm:flex-row mx-4">
        <div className=" w-full mx-4 my-2 sm:my-0">
          <button
            disabled={isLoading}
            className="bg-green-800 hover:bg-[#0e5737] text-white w-full mt-4 py-2 px-4 rounded-full">
            SEND LINK
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;

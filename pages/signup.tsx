import { SubmitHandler, useForm } from 'react-hook-form';
// import { Checkbox } from '@material-tailwind/react';
import Button from 'components/button';
import Layout from '@layouts/layout';
import Input from 'components/input';

interface IsignUpForm {
  email: string;
  username: string;
  password: string;
  cPassword: string;
  phone: string;
  birth: string;
  extraError?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IsignUpForm>();

  const submitForm: SubmitHandler<IsignUpForm> = (data: any) => {
    console.log(data);
  };

  return (
    <Layout>
      <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
        <Input
          name="email"
          type="text"
          label="Email"
          register={register('email', {
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Email regex',
            },
          })}
          placeholder="aaa@aaa.com"
          error={errors?.email?.message}
        />

        <Input
          name="username"
          label="Username"
          type="username"
          kind="text"
          register={register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
              message: 'Username regex',
            },
          })}
          placeholder="abracadabra"
          error={errors?.username?.message}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          kind="text"
          register={register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'MinLength is 8',
            },
          })}
          placeholder="********"
          error={errors?.password?.message}
        />

        <Input
          name="cPassword"
          label="C Password"
          type="password"
          kind="text"
          register={register('cPassword', {
            required: 'cPassword is required',
            validate: (value: string) => {
              if (watch('password') != value) {
                return 'cPassword do not match';
              }
            },
          })}
          placeholder="********"
          error={errors?.cPassword?.message}
        />

        <Input
          name="phone"
          label="Phone"
          type="phone"
          kind="phone"
          register={register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^010[-]+[0-9]{4}[-]+[0-9]{4}$/,
              message: 'Phone regex',
            },
          })}
          placeholder="010-0000-0000"
          error={errors?.phone?.message}
        />

        <Input
          name="birth"
          label="Birth"
          type="birth"
          kind="text"
          register={register('birth', {
            required: 'Birthday is required',
            pattern: {
              value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
              message: 'Birth regex',
            },
          })}
          placeholder="yyyy-mm-dd"
          error={errors?.birth?.message}
        />

        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[#5470f8]"
              />
              <span className="ml-2">Small size checkbox </span>
            </label>
          </div>
        </div>

        <Button type="submit" text="Sign Up" />
      </form>
    </Layout>
  );
}

export default SignUp;

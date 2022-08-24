import { usersApi } from '@libs/client/api';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from 'components/button';
import Layout from '@layouts/layout';
import Input from 'components/input';

interface IForm {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = async ({ email, password }: IForm) => {
    try {
      const { data } = await usersApi.login(email, password);
      console.log('try', data);
    } catch {
      console.log('catch');
    } finally {
      console.log('finally');
    }
  };

  const onInvalid = (data: FieldErrors) => {
    console.log(data);
  };

  return (
    <Layout>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
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
          placeholder="E-mail"
          error={errors?.email?.message}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          kind="text"
          register={register('password', {
            required: 'Password is required',
          })}
          placeholder="********"
          error={errors?.password?.message}
        />

        <Button type="submit" text="Login" />
      </form>
    </Layout>
  );
}

export default Login;

import { usersApi } from '@libs/client/api';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from 'components/button';
import Layout from '@layouts/layout';

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
        className='flex flex-col divide-y-2'
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <label htmlFor='email'>email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'email regex',
            },
          })}
          placeholder='aaa@aaa.com'
        />
        <span className='text-red-500'>{errors?.email?.message}</span>

        <label htmlFor='password'>password</label>
        <input
          {...register('password', {
            required: 'Password is required',
            // minLength: {
            //   value: 8,
            //   message: 'minLength is 8',
            // },
          })}
          placeholder='********'
        />
        <span className='text-red-500'>{errors?.password?.message}</span>

        <Button type='submit' text='Login' />
      </form>
    </Layout>
  );
}

export default Login;

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
    <Layout canGoBack title="로그인">
      <form
        className="mt-5 flex flex-col"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <Input
          name="email"
          type="text"
          label="이메일"
          register={register('email', {
            required: 'Email is required',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Email regex',
            },
          })}
          placeholder="이메일을 입력하세요."
          error={errors?.email?.message}
        />

        <Input
          name="password"
          label="비밀번호"
          type="password"
          kind="text"
          register={register('password', {
            required: 'Password is required',
          })}
          placeholder="비밀번호를 입력하세요."
          error={errors?.password?.message}
        />

        <div className="mb-2" />

        <Button type="submit" text="로그인" />
        <div className="my-4 h-0.5 bg-gray-300" />

        <Button text="회원가입" />
      </form>
    </Layout>
  );
}

export default Login;

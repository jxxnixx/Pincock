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
    <Layout canGoBack title="회원가입">
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit(submitForm)}>
        <Input
          name="username"
          label="이름"
          type="username"
          kind="text"
          register={register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
              message: 'Username regex',
            },
          })}
          placeholder="이름"
          error={errors?.username?.message}
        />

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
          placeholder="이메일"
          error={errors?.email?.message}
        />

        <Input
          name="password"
          label="비밀번호"
          type="password"
          kind="text"
          register={register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'MinLength is 8',
            },
          })}
          placeholder="비밀번호"
          error={errors?.password?.message}
        />

        <Input
          name="cPassword"
          label="비밀번호 확인"
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
          placeholder="비밀번호 확인"
          error={errors?.cPassword?.message}
        />

        <Input
          name="phone"
          label="전화번호"
          type="phone"
          kind="phone"
          register={register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^010[-]+[0-9]{4}[-]+[0-9]{4}$/,
              message: 'Phone regex',
            },
          })}
          placeholder="000-0000-0000"
          error={errors?.phone?.message}
        />

        {/* <Input
          name="birth"
          label="생일"
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
        /> */}

        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[#5470f8]"
              />
              <span className="ml-2 text-sm">
                서비스 이용약관에 동의합니다. (필수){' '}
              </span>
            </label>
          </div>
        </div>
        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[#5470f8]"
              />
              <span className="ml-2 text-sm">
                개인정보 수집 및 이용동의에 동의합니다. (필수){' '}
              </span>
            </label>
          </div>
        </div>
        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[#5470f8]"
              />
              <span className="ml-2 text-sm">만 14세 이상입니다. (필수) </span>
            </label>
          </div>
        </div>
        <div className="block">
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[#5470f8]"
              />
              <span className="ml-2 text-sm">
                광고성 정보 수신동의에 동의합니다. (선택){' '}
              </span>
            </label>
          </div>
        </div>

        <div className="mb-3" />

        <Button type="submit" text="회원가입" />
      </form>
    </Layout>
  );
}

export default SignUp;

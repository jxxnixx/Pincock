import { SubmitHandler, useForm } from 'react-hook-form';
// import { Checkbox } from '@material-tailwind/react';
import Button from 'components/button';
import Layout from '@layouts/layout';

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
      <form
        className='flex flex-col divide-y-2'
        onSubmit={handleSubmit(submitForm)}
      >
        <label htmlFor='email'>email</label>
        <input
          id='email'
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

        <label htmlFor='username'>username</label>
        <input
          id='username'
          {...register('username', {
            required: 'Username is required',
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
              message: 'username regex',
            },
          })}
          placeholder='abracadabra'
        />
        <span className='text-red-500'>{errors?.username?.message}</span>

        <label htmlFor='password'>password</label>
        <input
          id='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'minLength is 8',
            },
          })}
          placeholder='********'
        />
        <span className='text-red-500'>{errors?.password?.message}</span>

        <label htmlFor='cPassword'>cPassword</label>
        <input
          id='cPassword'
          {...register('cPassword', {
            required: 'cPassword is required',
            validate: (value: string) => {
              if (watch('password') != value) {
                return 'cPassword do not match';
              }
            },
          })}
          placeholder='********'
        />
        <span className='invalid-feedback text-red-500'>
          {errors?.cPassword?.message}
        </span>

        <label htmlFor='phone'>phone</label>
        <input
          id='phone'
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^010[-]+[0-9]{4}[-]+[0-9]{4}$/,
              message: 'phone regex',
            },
          })}
          placeholder='010-0000-0000'
        />
        <span className='text-red-500'>{errors?.phone?.message}</span>

        <label htmlFor='birth'>birth</label>
        <input
          id='birth'
          {...register('birth', {
            required: 'Birthday is required',
            pattern: {
              value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
              message: 'birth regex',
            },
          })}
          placeholder='yyyy-mm-dd'
        />
        <span className='text-red-500'>{errors?.birth?.message}</span>

        <div className='flex justify-center'>
          <div>
            <div className='form-check'>
              <input
                className='form-check-input float-left mt-1 mr-2 h-4 w-4
                cursor-pointer appearance-none rounded-sm 
                border border-gray-300 bg-white bg-contain bg-center bg-no-repeat 
                align-top transition duration-200 
                checked:border-indigo-400 checked:bg-indigo-400 focus:outline-none'
                type='checkbox'
                value=''
                id='flexCheckDefault'
              />
              <label
                className='form-check-label inline-block text-gray-800'
                htmlFor='flexCheckDefault'
              >
                Default checkbox
              </label>
            </div>
          </div>
        </div>

        <label className='flex justify-center'>
          <input
            type='checkbox'
            className='h-4 w-4 cursor-pointer rounded-sm 
            border border-gray-300 bg-white bg-contain bg-center 
            accent-[#5470f8]'
          />
          Customized
        </label>

        <div className='block'>
          <div className='mt-2'>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='h-4 w-4 rounded accent-[#5470f8]'
              />
              <span className='ml-2'>Small size checkbox </span>
            </label>
          </div>
        </div>

        <Button type='submit' text='sign Up' />
      </form>
    </Layout>
  );
}

export default SignUp;

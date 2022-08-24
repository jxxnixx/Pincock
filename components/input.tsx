import { cls } from '@libs/client/utils';
import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  kind?: 'text' | 'phone' | 'price';
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  register,
  kind = 'text',
  error,
  ...rest
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === 'text' ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={name}
            {...register}
            {...rest}
            className={cls(
              'w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#5470f8] focus:outline-none focus:ring-[#5470f8]',
              error ? 'border-red-500' : 'border-[rgba(255,255,255,0.38)]'
            )}
          />
        </div>
      ) : null}
      {kind === 'phone' ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
            +82
          </span>
          <input
            id={name}
            {...register}
            {...rest}
            className={cls(
              'w-full appearance-none rounded-md rounded-l-none border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#5470f8] focus:outline-none focus:ring-[#5470f8]',
              error ? 'border-red-500' : 'border-[rgba(255,255,255,0.38)]'
            )}
          />
        </div>
      ) : null}
      <div className="mt-2 text-sm text-red-500">{error}</div>
    </div>
  );
}

// import { cls } from '@libs/client/utils';
// import React from 'react';
// import type { UseFormRegisterReturn } from 'react-hook-form';

// interface IProps {
//   type: 'text' | 'tel' | 'password';
//   label: string;
//   register: UseFormRegisterReturn;
//   error?: string;
//   readOnly?: boolean;
//   children?: React.ReactNode;
// }

// export default function Input({
//   type,
//   label,
//   register,
//   error,
//   readOnly,
//   children,
// }: IProps) {
//   return (
//     <div className='flex w-full flex-col'>
//       <label className='font-medium md:text-sm'>{label}</label>

//       <div className='mt-2 flex h-[3.75rem] w-full justify-between md:h-14'>
//         <input
//           type={type}
//           placeholder={label}
//           {…register}
//           readOnly={readOnly}
//           className={cls(
//             label === '전화번호' ? 'grow md:w-48' : 'w-full',
//             error ? 'border-red-500' : 'border-[rgba(255,255,255,0.38)]',
//             readOnly ? 'opacity-50' : '',
//             'h-full rounded border bg-transparent pl-4 outline-none placeholder:text-sm'
//           )}
//         />
//         {children}
//       </div>

//       <div className='mt-2 text-sm text-red-500'>{error}</div>
//     </div>
//   );
// }

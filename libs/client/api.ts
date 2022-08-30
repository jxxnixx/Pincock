import axios from 'axios';

export const API_URL = 'http://127.0.0.1:5000';
// export const API_URL = '';

const api = axios.create({
  baseURL: API_URL,
});

// interface IProps {
//   [key: string]: any;
// }

export const usersApi = {
  //   // 회원가입(NextJS api)
  //   signupNextApi: (req: IProps) => axios.post('/api/signup', req),

  //   // 회원가입
  //   signup: ({
  //     type,
  //     name,
  //     nickname,
  //     phoneNum,
  //     username,
  //     password,
  //     adAgree,
  //   }: IProps) =>
  //     api.post('/users/signup/', {
  //       signup_method: type,
  //       name,
  //       nickname,
  //       phone_number: phoneNum,
  //       username,
  //       password,
  //       ad_agree: adAgree,
  //     }),

  // 로그인(NextJS api)
  loginNext: (email: string, password: string) =>
    axios.post('/api/login', {
      email,
      password,
    }),

  // 로그인
  login: (email: string, password: string) =>
    api.post('/user/login/', {
      email,
      password,
    }),
};

export const pinApi = {
  getPinList: (userId: number) =>
    api.get(`/pin/search/user/${userId}`).then((res) => res.data),
};

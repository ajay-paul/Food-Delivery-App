import axios from 'axios';
import {ApiContants} from '../constants';

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_API_URL,
  });

const register = async user => {
    if (!user?.username || !user?.email || !user?.password) {
      return {status: false, message: 'Please fill up all fields'};
    }
    try {
      let requestBody = {
        username: user?.username,
        email: user?.email,
        password: user?.password,
      };
      let registerResponse = await AuthRequest.post(
        ApiContants.BACKEND_API.REGISTER,
        requestBody,
      );
      console.log(registerResponse?.data);
      return registerResponse?.data;
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Oops! Something went wrong'};
    }
  };

  export default {register};
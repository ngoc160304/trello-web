import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';
// Khởi tạo một đối tượng axios (authorizeAxiosIntance) mục đích để custom và cấu hình chung cho dự án
let authorizeAxiosIntance = axios.create();
// Thời gian tối đa của 1 request: để 10 phút
authorizeAxiosIntance.defaults.timeout = 1000 * 60 * 10; // api bị lỗi sau 10" thì sẽ ngắt
// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lêb be (phục vụ việc chúng ta sẽ lưu jwt tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosIntance.defaults.withCredentials = true;

/**
 * Cấu hình interceptors (bộ đánh chặn giữa mọi request và response)
 */
// interceptor request : can thiệp vào giữa request api (client -> server)
authorizeAxiosIntance.interceptors.request.use(
  (config) => {
    // kĩ thuật chặn spam click
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// interceptor response : can thiệp vào giữa response api (server - client)
authorizeAxiosIntance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);
    /**
     * Mọi mã http code nằm ngoài khoảng 200 -> 299 sẽ lỗi và rời vào đây
     */
    // Xử lý tập chugn phần mềm hiển thị thông báo lỗi trả về từ mọi api ở đâu (viết code 1 lần: clean code)
    // console.log(error) là sẽ thấy cấu trúc data mess lỗi như dưới đây
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    // dùng toastify hiển thị lỗi - người trừ lỗi 410 - GONE phục vụ cho việc tự động refresh token
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);
export default authorizeAxiosIntance;

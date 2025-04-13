import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';
import { refreshTokenAPI } from '../apis';
import { logoutUserAPI } from '../redux/User/userSlice';

/**
 * Không thể import { store } from "///" theo cách thông thường ở đây
 * Giải pháp : Inject store lã kỹ thuật cần sử dụng redux store ở các file ngoài phạm vi component như file authorizeAxios.js
 * Hiểu đơn giản : khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bến đó chúng ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 *
 */
let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};
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

// Khởi tạo một promise cho việc gọi api refreshTokenAPI
// Mục đích tạo Promise này để khi nào gọi api refreshTokenAPI xong xuôi thì mới retry lại nhiều ap bị lỗi trước đó
let refreshTokenPromise = null;

// interceptor response : can thiệp vào giữa response api (server - client)
authorizeAxiosIntance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);

    /** Quan trong: xử lý refresh token tự động */
    // Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }
    // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ họi api refresh token để làm mới lại accessToken
    // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config;
    if (error.response?.status === 410 && !originalRequests._retry) {
      // Gán một biến giá trị _retry luôn = true trong khoảng thời gian chờ, đảm bảo việc gọi refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm duy nhất (_retry là biến flag tự cho)
      // Việc gắn _retry có thể thay thể bằng kiểm tra biến refreshTokenPromise
      originalRequests._retry = true;
      // Kiểm tra nếu chưa có refresh token promise thì thực hiên gán việc gọi api refresh_token đồng thời gán vào cho cái refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ phía BE
            return data?.accessToken;
          })
          .catch((_error) => {
            // nếu như nhận bất cứ lỗi nào != 410 chủ động loggout
            axiosReduxStore.dispatch(logoutUserAPI());
            return Promise.reject(_error);
          })
          .finally(() => {
            // nếu lỗi hay thành công thì gán lại refreshTokenPromise = null;
            refreshTokenPromise = null;
          });
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        /**
         * Bước 1 : Đối với trường hợp nếu dự án cần lưu accesstoken vào localStorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây
         * ví dụ : axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
         * Hiện tại: ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE) sau khi api refreshToken được gọi thành công
         */
        // Bước 2 : Bước quan trọng : return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
        return authorizeAxiosIntance(originalRequests);
      });
    }

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

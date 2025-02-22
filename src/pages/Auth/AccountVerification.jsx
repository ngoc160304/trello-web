import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
import { verifiUserAPI } from '../../apis';
const AccountVerification = () => {
  // Lay gia tri email va token tu url
  let [searchParams] = useSearchParams();
  // const email = searchParams.get('email');
  // const token = searchParams.get('token');
  // cach 3
  const { email, token } = Object.fromEntries([...searchParams]);
  // Tao mot bien trang thai de biet duoc la da verify tai khoan thanh cong hay chua
  const [verified, setVerified] = useState(false);
  // Goi api de verify tai khoan
  // neu url co van de tra ve trang 404
  useEffect(() => {
    if (email && token) {
      verifiUserAPI({ email, token }).then(() => {
        setVerified(true);
      });
    }
  }, [email, token]);
  if (!email || !token) {
    return <Navigate to="/404" />;
  }
  // Neu chua verify xong thi loading
  if (!verified) {
    return <PageLoadingSpinner caption={'Verifing your account...'} />;
  }
  // Neu khong gap van de dieu huong ve trang login
  return <Navigate to={`/login?verifiedEmail=${email}`} />;
};
export default AccountVerification;

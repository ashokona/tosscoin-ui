import { useSelector } from 'react-redux';
const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state?.auth.user);

    return user ? children : window.location.href = `/auth`;
}

export default PrivateRoute
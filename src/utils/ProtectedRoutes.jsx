import { useAuthStore } from '../hooks/useAuthStore';
import WrongPathPage from '../pages/WrongPathPage';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const { isAuthenticated, isAdmin, isVet } = useAuthStore(state => ({
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        isVet: state.isVet,
    }));

    let hasRequiredRole = false;

    switch (requiredRole) {
        case 'admin':
            hasRequiredRole = isAdmin && isVet && isAuthenticated;
            break;
        case 'vet':
            hasRequiredRole = isVet && isAuthenticated;
            break;
        case 'general':
            hasRequiredRole = isAuthenticated;
            break;
        default:
            hasRequiredRole = !isAuthenticated;
    }

    return isAuthenticated && hasRequiredRole ? (
        <Component {...rest} />
    ) : (
        <WrongPathPage />
    );
};

export default ProtectedRoute;
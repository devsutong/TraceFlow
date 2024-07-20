import { useNavigate } from 'react-router-dom';

export default async function UserRedirect({ token }) {
  const navigate = useNavigate();
    
    try {
    const userResponse = await fetch('http://localhost:3000/user', {
      method: 'GET',  
      headers: { Authorization: `Bearer ${token}` },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      console.log(userData);
      const userRole = userData.role;

      // Redirect based on user role
      switch (userRole) {
        case 'admin':
          navigate('/about');
          break;
        case 'seller':
          navigate('/seller-dashboard');
          break;
        case 'buyer':
          navigate('/buyer-dashboard');
          break;
        default:
          // Handle unexpected role
          console.error('Unexpected user role:', userRole);
          break;
      }
    } else {
      console.error('Failed to fetch user data');
      // Handle error, e.g., show an error message
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error, e.g., show an error message
  }
};

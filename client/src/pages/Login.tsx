import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const onSuccess = (res) => {
        console.log(res);
    }

    const onFailure = (err) => {
        console.log(err);
    };

    const navigate = useNavigate();

  return (
    <div>
      <h2>Login</h2>
        {/* <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
          useOneTap
          clientId="222262057532-1s4prc4esjcl3o9653g922r52hpj3jc3.apps.googleusercontent.com"
        /> */}
     <button onClick={navigate('/dashboard')}>Login with Google</button>

    </div>
  );
};

export default Login;
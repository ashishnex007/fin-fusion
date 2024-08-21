import { GoogleLogin } from "@react-oauth/google";


const Signup = () => {

    const onSuccess = (res) => {
        console.log(res);
    }

    const onFailure = (err) => {
        console.log(err);
    };

  return (
    <div>
      <h2>Login</h2>
        <GoogleLogin
            buttonText="Signup"
            onSuccess={onSuccess}
            onFailure={onFailure}
            useOneTap
        />
    </div>
  );
};

export default Signup;
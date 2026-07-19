import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/Auth-Slice"

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      let userCredential;

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
      }

      const token = await userCredential.user.getIdToken();
      console.log(email);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userCredential.user.uid);
      localStorage.setItem("email", userCredential.user.email);

      dispatch(
        authActions.login({
          token: token,
          userId: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      );

      console.log("User Successfully login");
      history.replace("/home");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <form onSubmit={submitHandler} className="card shadow-lg p-4">
            <h2 className="text-center fw-bold mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg pe-5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={!email || !password || (!isLogin && !confirmPassword)}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-center mt-3">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            )}
          </form>

          {/* Toggle Login / Signup */}
          <div className="card shadow mt-4">
            <div className="card-body text-center">
              {isLogin ? (
                <p className="mb-0">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-primary fw-bold"
                    style={{ cursor: "pointer" }}
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p className="mb-0">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-primary fw-bold"
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

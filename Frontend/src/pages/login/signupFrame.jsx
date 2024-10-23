import { Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePass } from "../../helpers/validate";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../functions/signup";
import { useNavigate } from "react-router-dom";

const SignupFrame = () => {
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data, variables) => {
      localStorage.setItem("token", data.data.token);
      console.log(data?.data?.name);
      localStorage.setItem("name", data?.data?.name);
      navigate("/pos/dashboard");
        location.reload()
      console.log(data);
    },
    onError: (error, variables) => {
      console.log(error);
    },
  });
  const [data, setData] = useState({
    name: "",
    lname: "",
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "email") {
      console.log(validateEmail(value));
    } else {
      console.log(validatePass(value));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    // console.log("onsubmit");
    signupMutation.mutate(data);
  };

  return (
    <div className="adjustment">
      <div className="loginbox shadow p-5  pt-5 mx-5">
        <div>
          <h1 className="text-white  d-flex justify-content-center x-font">
            SignUp
          </h1>
          <div className="mt-5">
            <div>
              <div className="input-container">
                <input
                  value={data.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="text-white inp_u"
                  name="name"
                />
                <label className={`${data.name === "" ? "" : "inp_d"}`}>
                  Name
                </label>
              </div>
              <div className="input-container">
                <input
                  value={data.lname}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="text-white"
                  name="lname"
                />
                <label className={`${data.lname === "" ? "" : "inp_d"}`}>
                  {" "}
                  Last Name
                </label>
              </div>
              <div className="input-container">
                <input
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  className="text-white"
                  name="email"
                />
                <label className={`${data.email === "" ? "" : "inp_d"}`}>
                  Email
                </label>
              </div>
              <div className="input-container">
                <input
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                  type="password"
                  className="text-white"
                  name="password"
                />
                <label className={`${data.password === "" ? "" : "inp_d"}`}>
                  Password
                </label>
              </div>
            </div>
            <div>
              <button
                onClick={submit}
                className=" my-3 w-50 mx-auto mustard std-btn"
              >
                SignUp
              </button>
              <p className="text-white">
                Already have an Account?{" "}
                <Link to={"/auth/login"}>
                  {" "}
                  <p style={{ color: "rgb(0, 185, 184)" }}>Login</p>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFrame;

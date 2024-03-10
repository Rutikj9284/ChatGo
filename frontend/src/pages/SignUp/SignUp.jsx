import { Link } from "react-router-dom";
import { useState } from "react";
import userSignup from "../../hooks/userSignup";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signup} = userSignup();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500 font-serif"> ChatGo</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={inputs.fullName}
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-white label-text">Username</span>
            </label>
            <input
              type="text"
              value={inputs.username}
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Password</span>
            </label>
            <input
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-white label-text">Gender</span>
            </label>
            <input
              type="text"
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
              placeholder="male/female"
              className="w-full input input-bordered h-10"
            />
          </div>

          {/* <GenderCheckbox onCheckboxChange={handleGenderSelection} selectedGender={inputs.gender} /> */}

          <Link
            to={"/login"}
            className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading} >
              {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;

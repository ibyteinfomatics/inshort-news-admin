import React, { useState } from 'react';
import { userService } from '../../services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginView() {
  const [btnStatus, setBtnStatus] = useState(false);
  const [show, setShow] = useState(false)
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email, password }) {
    setBtnStatus(true);
    userService
      .login(email, password)
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          router.push('/admin/dashboard');
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBtnStatus(false);
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
  }

  const showPassword = ()=>{
    setShow(!show)
  }


  return (
    <div className="pageWrapper signUpProcess">
      
      <div className="signUp mb-12">
      <img src="/images/logo.png" alt="logo" className=" login_logo"/>
        <div className="bgWhite">
          <h3 className="font-20 text-center">Sign in to your account</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tabLogin">
              <div className="tabDataWrapper">
                <div className="form_group">
                  <div className="form-item">
                    <input
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                      className={`form-control ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </div>
                </div>
                <div className="form_group">
                  <div className="form-item">
                    <div className="Show-pass">
                    <input
                      style={{border:"none", outline:"none", height:"28px"}}
                      type={show?"text":"password"}
                      placeholder="Password"
                      {...register('password')}
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`} 
                    />
                    {show ? <VisibilityIcon onClick={showPassword}/> : <VisibilityOffIcon onClick={showPassword}/> }
                   </div>
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                </div>
               
                <div className="btnBlue fullW mt-6">
                  <button
                    type="submit"
                    className="btn btnBgBlue"
                    disabled={btnStatus}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

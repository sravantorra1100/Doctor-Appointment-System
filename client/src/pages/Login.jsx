import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { showLoading ,hideLoading} from '../redux/features/alertSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const onfinishHandler = async (value) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login", value)
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("login successfully")
        navigate('/')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      message.error('something went wrong')
    }
  }
  return (
    <>
      <div className="form-container ">
        <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
          <h3 className='text-center'>Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">Not a user Register here</Link>
          <button className='btn btn-primary' type="submit">Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login

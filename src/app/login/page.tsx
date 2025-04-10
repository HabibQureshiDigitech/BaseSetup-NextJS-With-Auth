'use client'

import { authenticate } from '@/Utils/auth'
import { Button, Card, Form, Input, message } from 'antd'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const onFinish = (values: any) => {
    const user = authenticate(values.email, values.password)
    if (user) {
      setCookie('role', user.role)
      localStorage.setItem('role' , user.role)
      if (user.role === 'user') router.push('/')
      else router.push('/dashboard')
    } else {
      message.error('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<span className="text-gray-700">Email</span>}
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input placeholder="Enter your email" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-gray-700">Password</span>}
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password placeholder="Enter your password" className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login

import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '@/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavBar } from '@/Compo/NavBar';


export function Login() {

  const navigator = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', user);
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      setError("It's either wrong email or password, Please try again.");
      return Promise.reject(new Error('Something went wrong!!'));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    await handleLogin(); 

    const token = await handleLogin()
    if (token) {
      localStorage.setItem("token", token)
      navigator('/')
    }
  };

  

  return (
    
    <div className="m-0">
  <div className=" ">

    <h1>Login Page</h1>
  </div>
    <div className="w-1/3 m-auto mt-10">
      <form action="POST" onSubmit={handleSubmit}>
        <div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              />
          </div>
        </div>
        <Button type="submit">Login</Button>
        <p>
          Create an Account <Link to="/signUp" className='text-blue-600'> here</Link>
        </p>
      </form>
    </div>
  </div>
  );
}

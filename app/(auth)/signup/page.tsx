"use client";

import { useState } from 'react';
import { supabase } from '../../../DBConnection';
import { testConnection } from '../../../DBConnection'; // Ensure the path is correct

export default function SignUp() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reqNumber, setReqNumber] = useState('');
  const [rbqNumber, setRbqNumber] = useState('');
  const [idPicture, setIdPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleReqNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReqNumber(e.target.value);
  };

  const handleRbqNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRbqNumber(e.target.value);
  };

  const handleIdPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIdPicture(e.target.files[0]);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Test the database connection
    const connectionSuccess = await testConnection();

    if (!connectionSuccess) {
      setError('Database connection failed');
      setLoading(false);
      return;
    }

    // Sign up with Supabase
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If needed, you can save additional user data to your Supabase database
    // Here is an example for inserting additional user info into a table
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user?.id,
          name,
          phone_number: phoneNumber,
          req_number: reqNumber,
          rbq_number: rbqNumber,
        },
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess('User registered successfully');
    }

    setLoading(false);
  };

  const isPasswordMatch = password === confirmPassword && password.length > 0;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create your account</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp}>
        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              id="name"
              className="form-input w-full py-2"
              type="text"
              placeholder="Corey Barker"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="form-input w-full py-2"
              type="email"
              placeholder="corybarker@email.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              className="form-input w-full py-2"
              type="text"
              placeholder="(+750) 932-8907"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                placeholder="••••••••"
                required
                pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{12,}$"
                title="Password must be at least 12 characters long, contain at least one capital letter, and one number."
                value={password}
                onChange={handlePasswordChange}
              />
              {isPasswordMatch && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {isPasswordMatch && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="reqNumber"
            >
              Req Number
            </label>
            <input
              id="reqNumber"
              className="form-input w-full py-2"
              type="text"
              placeholder="Enter Req Number"
              value={reqNumber}
              onChange={handleReqNumberChange}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="rbqNumber"
            >
              RBQ Number
            </label>
            <input
              id="rbqNumber"
              className="form-input w-full py-2"
              type="text"
              placeholder="Enter RBQ Number"
              value={rbqNumber}
              onChange={handleRbqNumberChange}
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="idPicture"
            >
              ID Picture
            </label>
            <input
              id="idPicture"
              className="form-input w-full py-2"
              type="file"
              accept="image/*"
              onChange={handleIdPictureChange}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%]"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </form>

      {/* Bottom link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By signing up, you agree to the{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="whitespace-nowrap font-medium text-gray-700 underline hover:no-underline"
            href="#0"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
}

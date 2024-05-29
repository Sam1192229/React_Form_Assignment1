import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length <= 6) {
      newErrors.username = 'Username must be more than 6 characters';
    }

    if (!formData.email) newErrors.email = 'Email is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.phoneNo) newErrors.phoneNo = 'Phone No. is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) newErrors.panNo = 'Pan No. is required';
    
    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar No. is required';
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar No. must be exactly 12 digits';
    }

    return newErrors;
  };

  const validatePassword = (password) => {
    const newErrors = [];
    if (password.length < 8) newErrors.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) newErrors.push('one uppercase letter');
    if (!/[a-z]/.test(password)) newErrors.push('one lowercase letter');
    if (!/\d/.test(password)) newErrors.push('one number');
    if (!/[@$!%*?&]/.test(password)) newErrors.push('one special character');
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  useEffect(() => {
    setErrors(validate());
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0 && passwordErrors.length === 0) {
      navigate('/success', { state: formData });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='min-h-screen flex justify-between bg-gray-800'>
      <div className='flex flex-col items-center justify-center ml-72 '>
        <h1 className='text-3xl font-bold text-gray-200'>React Validation Form</h1>
      </div>
      <div className='flex flex-col items-center justify-center w-1/2'>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 w-full">
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-300" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'password' ? (
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors[field] && 'border-red-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                  {passwordErrors.length > 0 && (
                    <ul className="mt-2 text-red-500 text-sm list-disc pl-5">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>Password must include {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors[field] && 'border-red-500'}`}
                />
              )}
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 hover:bg-blue-800"
            disabled={Object.keys(errors).length !== 0 || passwordErrors.length !== 0}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

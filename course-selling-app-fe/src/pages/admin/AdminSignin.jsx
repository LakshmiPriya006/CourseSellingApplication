// import React, { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';

// const AdminSignin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         login(email, password, 'admin');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
//                 <div className="text-center">
//                     <h2 className="text-2xl font-bold text-neutral-800">Administrator Portal</h2>
//                     <p className="text-sm text-neutral-500">Sign in to manage your courses</p>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="email">
//                             Email Address
//                         </label>
//                         <input
//                             className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3"
//                             id="email"
//                             type="email"
//                             placeholder="admin@example.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3"
//                             id="password"
//                             type="password"
//                             placeholder="••••••••"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <button
//                             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//                             type="submit"
//                         >
//                             Sign In as Admin
//                         </button>
//                     </div>
//                 </form>
//                 <p className="text-sm text-center text-neutral-500">
//                     Need to create an admin account?{' '}
//                     <Link to="/admin/signup" className="font-medium text-primary-600 hover:underline">
//                         Register here
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AdminSignin;



import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

// 1. Zod schema for sign-in validation.
const adminSigninSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

// 2. Reusable Input component for consistent styling.
const Input = ({ id, label, type, placeholder, register, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
            {label}
        </label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`block w-full rounded-lg border bg-slate-900/70 py-2.5 px-4 text-gray-200 placeholder-gray-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 
            ${error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
            {...register(id)}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error.message}</p>}
    </div>
);


const AdminSignin = () => {
    const { login } = useAuth();

    // 3. Set up react-hook-form and get the `isSubmitting` state.
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(adminSigninSchema)
    });

    // 4. Handle validated data on submit.
    const onSubmit = (data) => {
        login(data.email, data.password, 'admin');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-md">
                <div className="text-center">
                    <h2 className="mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-black text-transparent">
                        Administrator Portal
                    </h2>
                    <p className="text-gray-400">Sign in to manage your platform</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <Input id="email" label="Email Address" type="email" placeholder="admin@example.com" register={register} error={errors.email} />
                    <Input id="password" label="Password" type="password" placeholder="••••••••" register={register} error={errors.password} />
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Need to create an admin account?{' '}
                    <Link to="/admin/signup" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
                        Register here
                    </Link>
                </p>
            </div>
            
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.05); opacity: 0.15; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default AdminSignin;
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useAuth } from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';

// // 1. Define the validation schema using Zod, mirroring your backend rules.
// const adminSignupSchema = z.object({
//     firstName: z.string().min(3, { message: "First name must be at least 3 characters" }).max(100),
//     lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }).max(100),
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(3, { message: "Password must be at least 3 characters" }).max(30),
// });


// const AdminSignup = () => {
//     const { signup } = useAuth();

//     // 2. Set up react-hook-form with the Zod resolver.
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: zodResolver(adminSignupSchema)
//     });

//     // 3. The submit handler now receives validated data.
//     const onSubmit = (data) => {
//         // Call the signup function with the 'admin' type
//         signup(data.firstName, data.lastName, data.email, data.password, 'admin');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
//                 <h2 className="text-2xl font-bold text-center text-neutral-800">Create Admin Account</h2>
                
//                 {/* 4. Use handleSubmit from the hook */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         {/* First Name Input */}
//                         <div className="w-full">
//                             <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="firstName">First Name</label>
//                             <input 
//                                 className={`block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 ${errors.firstName ? 'border-red-500' : ''}`}
//                                 id="firstName" 
//                                 type="text" 
//                                 placeholder="John" 
//                                 {...register("firstName")} // 5. Register the input
//                             />
//                              {/* 6. Conditionally display the error message */}
//                             {errors.firstName && <p className="text-red-500 text-xs italic mt-1">{errors.firstName.message}</p>}
//                         </div>
//                         {/* Last Name Input */}
//                         <div className="w-full">
//                             <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="lastName">Last Name</label>
//                             <input 
//                                 className={`block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 ${errors.lastName ? 'border-red-500' : ''}`}
//                                 id="lastName" 
//                                 type="text" 
//                                 placeholder="Doe" 
//                                 {...register("lastName")}
//                             />
//                             {errors.lastName && <p className="text-red-500 text-xs italic mt-1">{errors.lastName.message}</p>}
//                         </div>
//                     </div>
//                     {/* Email Input */}
//                     <div>
//                         <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="email">Email Address</label>
//                         <input 
//                            className={`block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 ${errors.email ? 'border-red-500' : ''}`}
//                             id="email" 
//                             type="email" 
//                             placeholder="admin@example.com" 
//                             {...register("email")}
//                         />
//                         {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>}
//                     </div>
//                     {/* Password Input */}
//                     <div>
//                         <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="password">Password</label>
//                         <input 
//                             className={`block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 ${errors.password ? 'border-red-500' : ''}`}
//                             id="password" 
//                             type="password" 
//                             placeholder="••••••••" 
//                             {...register("password")}
//                         />
//                         {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
//                     </div>
//                     {/* Submit Button */}
//                     <div>
//                         <button 
//                             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
//                             type="submit"
//                         >
//                             Create Account
//                         </button>
//                     </div>
//                 </form>
//                 <p className="text-sm text-center text-neutral-500">
//                     Already have an admin account?{' '}
//                     <Link to="/admin/signin" className="font-medium text-blue-600 hover:underline">
//                         Sign in here
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AdminSignup;

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

// Zod validation schema remains the same.
const adminSignupSchema = z.object({
    firstName: z.string().min(3, { message: "First name must be at least 3 characters" }).max(100),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters" }).max(100),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3, { message: "Password must be at least 3 characters" }).max(30),
});

// --- NEW: Reusable and styled Input component ---
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


const AdminSignup = () => {
    const { signup } = useAuth();

    // Added `isSubmitting` to disable the button during the request.
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(adminSignupSchema)
    });

    const onSubmit = (data) => {
        // The signup logic is unchanged.
        signup(data.firstName, data.lastName, data.email, data.password, 'admin');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-md">
                <h2 className="mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-black text-transparent">
                    Create Admin Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-6 sm:flex-row">
                        {/* --- Using the new Input component --- */}
                        <Input id="firstName" label="First Name" type="text" placeholder="John" register={register} error={errors.firstName} />
                        <Input id="lastName" label="Last Name" type="text" placeholder="Doe" register={register} error={errors.lastName} />
                    </div>
                    
                    <Input id="email" label="Email Address" type="email" placeholder="admin@example.com" register={register} error={errors.email} />
                    <Input id="password" label="Password" type="password" placeholder="••••••••" register={register} error={errors.password} />
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an admin account?{' '}
                    <Link to="/admin/signin" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
                        Sign in here
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

export default AdminSignup;
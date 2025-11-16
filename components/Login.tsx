import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
    onLogin: (username: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('الرجاء إدخال اسم المستخدم وكلمة المرور.');
            return;
        }
        const success = onLogin(username, password);
        if (!success) {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0057B8]">E-Ligue</h1>
                    <p className="text-lg text-gray-500 font-normal">عصبة درعة تافيلالت لكرة القدم</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">تسجيل الدخول</h2>
                    <p className="text-center text-gray-500 mb-8 font-normal">مرحبا بعودتك! الرجاء إدخال بياناتك.</p>
                    
                    {error && (
                        <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3" role="alert">
                            <AlertCircle className="w-5 h-5"/>
                            <p className="font-semibold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">اسم المستخدم</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 ps-12 pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md"
                                    placeholder="أدخل اسم المستخدم"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-400">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 ps-12 pe-12 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md"
                                    placeholder="أدخل كلمة المرور"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 end-0 flex items-center px-3.5 text-gray-500 hover:text-[#0057B8]"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#0057B8] focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ms-2 block text-sm text-gray-900 font-medium">تذكرني</label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-[#0057B8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                            >
                                تسجيل الدخول
                            </button>
                        </div>
                    </form>
                </div>
                 <div className="text-center mt-8 text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} FRMF - E-Ligue Draa-Tafilalet
                </div>
            </div>
        </div>
    );
};

export default Login;

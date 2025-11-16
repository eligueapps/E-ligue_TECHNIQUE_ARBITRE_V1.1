import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { User, Page } from '../types';
import { USERS_DATA, PAGE_PERMISSIONS_OPTIONS, NAV_ITEMS } from '../constants';
import { PlusCircle, Search, FileDown, Edit, Trash2, Users as UsersIcon, User as UserIcon, Fingerprint, Mail, Phone, Lock, CheckCircle, X, Eye, EyeOff } from 'lucide-react';

const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
            <UsersIcon className="w-8 h-8 text-[#0057B8]" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
                <p className="text-gray-500 font-normal mt-1">إضافة وتعديل بيانات وصلاحيات مستخدمي النظام.</p>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="بحث عن مستخدم..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2 ps-10 pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md"
                />
                <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
            </div>
            <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50" title="تصدير البيانات">
                <FileDown className="w-5 h-5" />
            </button>
            <button onClick={onAddNew} className="flex items-center gap-2 px-4 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                <PlusCircle className="w-5 h-5" />
                <span>إضافة مستخدم جديد</span>
            </button>
        </div>
    </div>
);

const UserTable: React.FC<{ users: User[]; onEdit: (user: User) => void; onDelete: (userId: number) => void }> = ({ users, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">الاسم و اللقب</th>
                    <th scope="col" className="px-6 py-4 font-semibold">رقم البطاقة الوطنية</th>
                    <th scope="col" className="px-6 py-4 font-semibold">رقم الهاتف</th>
                    <th scope="col" className="px-6 py-4 font-semibold">البريد الإلكتروني</th>
                    <th scope="col" className="px-6 py-4 font-semibold">اسم المستخدم</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الصفحات المسموح بها</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{user.fullName}</th>
                        <td className="px-6 py-4 font-mono font-medium">{user.nationalId}</td>
                        <td className="px-6 py-4 font-medium" dir="ltr">{user.phone}</td>
                        <td className="px-6 py-4 font-medium">{user.email}</td>
                        <td className="px-6 py-4 font-mono font-semibold text-gray-700">{user.username}</td>
                        <td className="px-6 py-4 max-w-sm">
                           <div className="flex flex-wrap gap-1">
                                {user.permissions.length === PAGE_PERMISSIONS_OPTIONS.length ? (
                                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">جميع الصلاحيات</span>
                                ) : (
                                    user.permissions.map(perm => {
                                        const navItem = NAV_ITEMS.find(item => item.key === perm);
                                        return navItem ? <span key={perm} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">{navItem.label}</span> : null;
                                    })
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onEdit(user)} className="p-2 text-gray-500 hover:text-yellow-600" title="تعديل"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(user.id)} className="p-2 text-gray-500 hover:text-red-600" title="حذف"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Card>
);

const FormInput: React.FC<any> = ({ label, icon: Icon, id, type = "text", ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
            {Icon && <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><Icon className="w-5 h-5" /></span>}
            <input id={id} type={type} {...props} className={`w-full bg-white border border-gray-300 rounded-xl py-2.5 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] disabled:bg-gray-100 focus:shadow-md`} />
        </div>
    </div>
);

const FormPasswordInput: React.FC<any> = ({ label, icon: Icon, id, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <div className="relative">
                {Icon && <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><Icon className="w-5 h-5" /></span>}
                <input id={id} type={showPassword ? 'text' : 'password'} {...props} className={`w-full bg-white border border-gray-300 rounded-xl py-2.5 ${Icon ? 'ps-10' : 'ps-4'} pe-12 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md`} />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 flex items-center px-3.5 text-gray-500 hover:text-[#0057B8]"
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

const UserForm: React.FC<{ user: Partial<User>; onSave: (user: User) => void; onCancel: () => void; existingUsernames: string[] }> = ({ user, onSave, onCancel, existingUsernames }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const page = value as Page;
        const currentPermissions = formData.permissions || [];
        if (checked) {
            setFormData(prev => ({ ...prev, permissions: [...currentPermissions, page] }));
        } else {
            setFormData(prev => ({ ...prev, permissions: currentPermissions.filter(p => p !== page) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isEditing = user.id !== undefined;

        if (!formData.fullName || !formData.username) {
            alert('يرجى ملء حقلي الاسم الكامل واسم المستخدم.');
            return;
        }

        if (!isEditing && !formData.password) {
            alert('كلمة المرور مطلوبة عند إنشاء مستخدم جديد.');
            return;
        }

        const usernameToCheck = formData.username?.toLowerCase();
        const originalUsername = isEditing ? user.username?.toLowerCase() : '';
        if (usernameToCheck !== originalUsername && existingUsernames.some(u => u.toLowerCase() === usernameToCheck)) {
             alert('اسم المستخدم موجود بالفعل. الرجاء اختيار اسم آخر.');
             return;
        }
        
        onSave(formData as User);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6">{user.id ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormInput label="الاسم و اللقب" icon={UserIcon} id="fullName" name="fullName" value={formData.fullName || ''} onChange={handleChange} required />
                    <FormInput label="رقم البطاقة الوطنية للتعريف" icon={Fingerprint} id="nationalId" name="nationalId" value={formData.nationalId || ''} onChange={handleChange} />
                    <FormInput label="رقم الهاتف" icon={Phone} id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
                    <FormInput label="البريد الإلكتروني" icon={Mail} id="email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
                    <FormInput label="اسم المستخدم" icon={UserIcon} id="username" name="username" value={formData.username || ''} onChange={handleChange} required />
                    <FormPasswordInput label="كلمة المرور" icon={Lock} id="password" name="password" value={formData.password || ''} onChange={handleChange} placeholder={user.id ? "اتركه فارغًا لعدم التغيير" : ""} required={!user.id} />
                </div>
                <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-4">الصفحات المسموح تصفحها</label>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 border rounded-xl bg-gray-50">
                        {PAGE_PERMISSIONS_OPTIONS.map(perm => (
                           <label key={perm.key} htmlFor={`perm-${perm.key}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-200">
                               <input 
                                   type="checkbox"
                                   id={`perm-${perm.key}`}
                                   value={perm.key}
                                   checked={formData.permissions?.includes(perm.key) || false}
                                   onChange={handlePermissionChange}
                                   className="h-4 w-4 rounded border-gray-300 text-[#0057B8] focus:ring-[#0057B8]"
                               />
                               {perm.label}
                           </label>
                        ))}
                     </div>
                </div>
                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ المستخدم
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        <X className="w-5 h-5" /> إلغاء
                    </button>
                </div>
            </form>
        </Card>
    );
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed bottom-5 left-5 bg-green-600 text-white py-3 px-6 rounded-xl shadow-xl flex items-center gap-3 z-50 font-semibold animate-pulse">
        <CheckCircle className="w-6 h-6" />
        <span>{message}</span>
    </div>
);

const Users: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [users, setUsers] = useState<User[]>(USERS_DATA);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(USERS_DATA);
    const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = users.filter(user =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleAddNew = () => {
        setSelectedUser({
            fullName: '', nationalId: '', phone: '', email: '', username: '', password: '', role: 'مستخدم', permissions: [],
        });
        setView('form');
    };
    
    const handleEdit = (user: User) => {
        setSelectedUser({...user, password: ''});
        setView('form');
    };
    
    const handleDelete = (userId: number) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.')) {
            setUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    const handleSave = (userData: User) => {
        if (userData.id) {
            setUsers(prev => prev.map(u => {
                if (u.id === userData.id) {
                    const { password, ...rest } = userData;
                    const finalPassword = password ? password : u.password;
                    return { ...u, ...rest, password: finalPassword };
                }
                return u;
            }));
        } else {
             const newUser = { ...userData, id: Date.now() };
             setUsers(prev => [...prev, newUser]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="✅ تم حفظ المستخدم بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedUser && <UserForm user={selectedUser} onSave={handleSave} onCancel={handleCancel} existingUsernames={users.map(u => u.username)} />}
        </div>
    );
};

export default Users;

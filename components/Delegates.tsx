import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Delegate } from '../types';
import { DELEGATES_DATA, DELEGATE_PERMISSIONS_OPTIONS } from '../constants';
import { PlusCircle, Search, FileDown, Eye, Edit, Trash2, User, Fingerprint, Mail, Phone, Banknote, Briefcase, CheckCircle, X, Hash, UserCheck, BadgeCheck } from 'lucide-react';

const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-[#0057B8]" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900">تدبير المناديب</h1>
                <p className="text-gray-500 font-normal mt-1">إضافة وتعديل بيانات مناديب المباريات.</p>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="بحث عن مندوب..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2 ps-10 pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md"
                />
                <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
            </div>
            <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                <FileDown className="w-5 h-5" />
            </button>
            <button onClick={onAddNew} className="flex items-center gap-2 px-4 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                <PlusCircle className="w-5 h-5" />
                <span>إضافة مندوب</span>
            </button>
        </div>
    </div>
);

const DelegateTable: React.FC<{ delegates: Delegate[]; onEdit: (delegate: Delegate) => void; onDelete: (delegateCode: string) => void }> = ({ delegates, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز المندوب</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الاسم الكامل</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الصلاحيات</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الهاتف</th>
                    <th scope="col" className="px-6 py-4 font-semibold">البريد الإلكتروني</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                {delegates.map((delegate) => (
                    <tr key={delegate.delegateCode} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{delegate.delegateCode}</td>
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{delegate.fullNameAr}</th>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                                {Object.entries(delegate.permissions).map(([key, value]) => (
                                   value && <span key={key} className="px-2 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full">{DELEGATE_PERMISSIONS_OPTIONS.find(p => p.key === key)?.label}</span>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium" dir="ltr">{delegate.phone}</td>
                        <td className="px-6 py-4 font-medium">{delegate.email}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onEdit(delegate)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(delegate.delegateCode)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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
            <input id={id} type={type} {...props} className={`w-full bg-white border border-gray-300 rounded-xl py-2 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] disabled:bg-gray-100 focus:shadow-md`} />
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ id: string; label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, checked, onChange }) => (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer bg-white p-3 rounded-xl border border-gray-200 hover:bg-gray-50">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2"><BadgeCheck className="w-5 h-5 text-gray-400" />{label}</span>
        <div className="relative">
            <input type="checkbox" id={id} className="sr-only" checked={checked} onChange={onChange} />
            <div className={`block w-12 h-6 rounded-full transition ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute start-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${checked ? 'translate-x-6' : ''}`}></div>
        </div>
    </label>
);


const DelegateForm: React.FC<{ delegate: Delegate; onSave: (delegate: Delegate) => void; onCancel: () => void }> = ({ delegate, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Delegate>(delegate);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [name]: checked,
            }
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullNameAr || !formData.fullNameFr || !formData.phone) {
            alert('يرجى ملء جميع الحقول المطلوبة.');
            return;
        }
        if (formData.bankAccountNumber && !/^\d{24}$/.test(formData.bankAccountNumber)) {
            alert('رقم الحساب البنكي يجب أن يتكون من 24 رقمًا.');
            return;
        }
        onSave(formData);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">البيانات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FormInput label="رمز المندوب" icon={Hash} id="delegateCode" name="delegateCode" value={formData.delegateCode} disabled />
                        <FormInput label="الاسم الكامل (بالعربية)" icon={User} id="fullNameAr" name="fullNameAr" value={formData.fullNameAr} onChange={handleChange} required />
                        <FormInput label="الاسم الكامل (بالفرنسية)" icon={User} id="fullNameFr" name="fullNameFr" value={formData.fullNameFr} onChange={handleChange} required />
                        <FormInput label="رقم البطاقة الوطنية" icon={Fingerprint} id="nationalId" name="nationalId" value={formData.nationalId} onChange={handleChange} />
                        <FormInput label="البريد الإلكتروني" icon={Mail} id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        <FormInput label="رقم الهاتف" icon={Phone} id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        <div className="lg:col-span-3">
                           <FormInput 
                                label="رقم الحساب البنكي (24 رقم)" 
                                icon={Banknote} 
                                id="bankAccountNumber" 
                                name="bankAccountNumber" 
                                value={formData.bankAccountNumber} 
                                onChange={handleChange} 
                                pattern="[0-9]{24}"
                                title="يجب أن يتكون رقم الحساب البنكي من 24 رقمًا."
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">البيانات الوظيفية والإدارية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormInput label="الرتبة أو الوظيفة" icon={Briefcase} id="rank" name="rank" value={formData.rank} onChange={handleChange} />
                        <div className="md:col-span-2">
                             <label className="block text-sm font-semibold text-gray-700 mb-2">صلاحيات المندوب</label>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {DELEGATE_PERMISSIONS_OPTIONS.map(perm => (
                                    <ToggleSwitch
                                        key={perm.key}
                                        id={`perm-${perm.key}`}
                                        label={perm.label}
                                        checked={formData.permissions[perm.key]}
                                        onChange={(e) => handlePermissionChange({ ...e, target: { ...e.target, name: perm.key, checked: e.target.checked }})}
                                    />
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ المندوب
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        <X className="w-5 h-5" /> إلغاء
                    </button>
                </div>
            </form>
        </Card>
    );
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed bottom-5 left-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl flex items-center gap-3 z-50 font-semibold">
        <CheckCircle className="w-6 h-6" />
        <span>{message}</span>
        <button onClick={onClose} className="absolute top-1 right-1 text-white/70 hover:text-white">&times;</button>
    </div>
);


const Delegates: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [delegates, setDelegates] = useState<Delegate[]>(DELEGATES_DATA);
    const [filteredDelegates, setFilteredDelegates] = useState<Delegate[]>(DELEGATES_DATA);
    const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = delegates.filter(delegate =>
            delegate.fullNameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            delegate.fullNameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            delegate.delegateCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDelegates(results);
    }, [searchTerm, delegates]);

    const handleAddNew = () => {
        const lastCodeNum = delegates.reduce((max, d) => {
            const num = parseInt(d.delegateCode.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
        const newCode = `MD-${String(lastCodeNum + 1).padStart(5, '0')}`;

        setSelectedDelegate({
            delegateCode: newCode,
            fullNameAr: '',
            fullNameFr: '',
            nationalId: '',
            email: '',
            phone: '',
            bankAccountNumber: '',
            rank: 'مندوب',
            permissions: {
                enterResults: false,
                uploadReports: false,
                followDisciplinary: false,
                sendNotifications: false,
            },
        });
        setView('form');
    };
    
    const handleEdit = (delegate: Delegate) => {
        setSelectedDelegate(delegate);
        setView('form');
    };
    
    const handleDelete = (delegateCode: string) => {
        if (window.confirm('هل أنت متأكد من حذف بيانات هذا المندوب؟')) {
            setDelegates(prev => prev.filter(d => d.delegateCode !== delegateCode));
        }
    };

    const handleSave = (delegateData: Delegate) => {
        const exists = delegates.some(d => d.delegateCode === delegateData.delegateCode);
        if (exists) {
            setDelegates(prev => prev.map(d => d.delegateCode === delegateData.delegateCode ? delegateData : d));
        } else {
            setDelegates(prev => [...prev, delegateData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedDelegate(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="تم حفظ المندوب بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <DelegateTable delegates={filteredDelegates} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedDelegate && <DelegateForm delegate={selectedDelegate} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Delegates;

import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Referee } from '../types';
import { REFEREES_DATA, GENDERS, MARITAL_STATUSES, REFEREE_CLASSIFICATIONS, REFEREE_ROLES, REFEREE_BRANCHES } from '../constants';
import { PlusCircle, Search, FileDown, Award, Eye, Edit, Trash2, User, Users, Calendar, MapPin, Fingerprint, Briefcase, Heart, Home, Banknote, List, Star, Shield, CheckCircle, X, Image as ImageIcon, Hash } from 'lucide-react';

const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#0057B8]" />
            <div>
                <h1 className="text-2xl font-bold text-gray-900">تدبير الحكام</h1>
                <p className="text-gray-500 font-normal mt-1">إضافة وتعديل بيانات حكام العصبة.</p>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="بحث عن حكم..."
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
                <span>إضافة حكم</span>
            </button>
        </div>
    </div>
);

const RefereeTable: React.FC<{ referees: Referee[]; onEdit: (referee: Referee) => void; onDelete: (refereeCode: string) => void }> = ({ referees, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-4 font-semibold"> </th>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز الحكم</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الاسم الكامل</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الاسم بالفرنسية</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الترخيص</th>
                    <th scope="col" className="px-6 py-4 font-semibold">التصنيف</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الصفة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الفرع</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                {referees.map((referee) => (
                    <tr key={referee.refereeCode} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-2">
                             {referee.profilePicture ? (
                                <img src={referee.profilePicture} alt={referee.fullNameAr} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                                    <User className="w-5 h-5"/>
                                </div>
                            )}
                        </td>
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{referee.refereeCode}</td>
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{referee.fullNameAr}</th>
                        <td className="px-6 py-4 font-medium">{referee.fullNameFr}</td>
                        <td className="px-6 py-4 font-mono text-xs">{referee.licenseNumber}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{referee.classification}</span></td>
                        <td className="px-6 py-4 text-xs">{referee.role}</td>
                        <td className="px-6 py-4 font-medium">{referee.branch}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button className="p-2 text-gray-500 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                                <button onClick={() => onEdit(referee)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(referee.refereeCode)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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

const FormSelect: React.FC<any> = ({ label, icon: Icon, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
             {Icon && <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><Icon className="w-5 h-5" /></span>}
            <select id={id} {...props} className={`w-full bg-white border border-gray-300 rounded-xl py-2.5 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] appearance-none focus:shadow-md`}>
                {children}
            </select>
        </div>
    </div>
);


const RefereeForm: React.FC<{ referee: Referee; onSave: (referee: Referee) => void; onCancel: () => void }> = ({ referee, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Referee>(referee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('يرجى تحميل صورة بصيغة PNG أو JPG.');
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation example
        if (!formData.fullNameAr || !formData.fullNameFr || !formData.licenseNumber) {
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
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">المعلومات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">صورة شخصية</label>
                            <div className="flex items-center gap-4">
                                {formData.profilePicture ? (
                                    <img src={formData.profilePicture} alt="صورة شخصية" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed">
                                        <ImageIcon className="w-10 h-10 text-gray-400" />
                                    </div>
                                )}
                                 <input
                                    id="referee-photo-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handlePhotoChange}
                                    className="block w-full text-sm text-gray-500 file:cursor-pointer file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0057B8] hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                        <FormInput label="الاسم الكامل (بالعربية)" icon={User} id="fullNameAr" name="fullNameAr" value={formData.fullNameAr} onChange={handleChange} required />
                        <FormInput label="الاسم الكامل (بالفرنسية)" icon={User} id="fullNameFr" name="fullNameFr" value={formData.fullNameFr} onChange={handleChange} required />
                        <FormInput label="تاريخ الازدياد" icon={Calendar} id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                        <FormInput label="مكان الازدياد" icon={MapPin} id="placeOfBirth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
                        <FormInput label="رقم البطاقة الوطنية" icon={Fingerprint} id="nationalId" name="nationalId" value={formData.nationalId} onChange={handleChange} />
                         <FormSelect label="الجنس" icon={Users} id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                        </FormSelect>
                        <FormInput label="المهنة" icon={Briefcase} id="profession" name="profession" value={formData.profession} onChange={handleChange} />
                        <FormSelect label="الحالة العائلية" icon={Heart} id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                            {MARITAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </FormSelect>
                        <div className="md:col-span-2">
                            <FormInput label="العنوان" icon={Home} id="address" name="address" value={formData.address} onChange={handleChange} />
                        </div>
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

                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">معلومات التحكيم</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FormInput label="رمز الحكم" icon={Hash} id="refereeCode" name="refereeCode" value={formData.refereeCode} disabled />
                        <FormInput label="رقم الترخيص" icon={List} id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />
                        <FormInput label="تاريخ بداية التحكيم" icon={Calendar} id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                        <FormSelect label="التصنيف" icon={Star} id="classification" name="classification" value={formData.classification} onChange={handleChange}>
                            {REFEREE_CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </FormSelect>
                         <FormSelect label="الصفة" icon={Award} id="role" name="role" value={formData.role} onChange={handleChange}>
                            {REFEREE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </FormSelect>
                        <FormSelect label="الفرع" icon={Shield} id="branch" name="branch" value={formData.branch} onChange={handleChange}>
                             {REFEREE_BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                        </FormSelect>
                    </div>
                </div>

                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ الحكم
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


const Refereeing: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [referees, setReferees] = useState<Referee[]>(REFEREES_DATA);
    const [filteredReferees, setFilteredReferees] = useState<Referee[]>(REFEREES_DATA);
    const [selectedReferee, setSelectedReferee] = useState<Referee | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = referees.filter(referee =>
            referee.fullNameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referee.fullNameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referee.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            referee.refereeCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredReferees(results);
    }, [searchTerm, referees]);

    const handleAddNew = () => {
        const lastCodeNum = referees.reduce((max, r) => {
            const num = parseInt(r.refereeCode.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
        const newCode = `IA-${String(lastCodeNum + 1).padStart(5, '0')}`;

        setSelectedReferee({
            refereeCode: newCode,
            profilePicture: '',
            fullNameAr: '',
            fullNameFr: '',
            dateOfBirth: '',
            placeOfBirth: '',
            nationalId: '',
            gender: GENDERS[0],
            profession: '',
            maritalStatus: MARITAL_STATUSES[0],
            address: '',
            bankAccountNumber: '',
            licenseNumber: '',
            startDate: '',
            classification: REFEREE_CLASSIFICATIONS[0],
            role: REFEREE_ROLES[0],
            branch: REFEREE_BRANCHES[0],
        });
        setView('form');
    };
    
    const handleEdit = (referee: Referee) => {
        setSelectedReferee(referee);
        setView('form');
    };
    
    const handleDelete = (refereeCode: string) => {
        if (window.confirm('هل أنت متأكد من حذف بيانات هذا الحكم؟')) {
            setReferees(prev => prev.filter(r => r.refereeCode !== refereeCode));
        }
    };

    const handleSave = (refereeData: Referee) => {
        const exists = referees.some(r => r.refereeCode === refereeData.refereeCode);
        if (exists) {
            setReferees(prev => prev.map(r => r.refereeCode === refereeData.refereeCode ? refereeData : r));
        } else {
            setReferees(prev => [...prev, refereeData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedReferee(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="تم حفظ الحكم بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <RefereeTable referees={filteredReferees} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedReferee && <RefereeForm referee={selectedReferee} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Refereeing;
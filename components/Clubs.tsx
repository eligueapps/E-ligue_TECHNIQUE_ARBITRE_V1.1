import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Club } from '../types';
import { CLUBS_DATA, CLASSIFICATIONS, COMPETITIONS } from '../constants';
import { PlusCircle, Search, FileDown, Shield, Eye, Edit, Trash2, Hash, Tag, Users, User, Calendar, Trophy, List, Fingerprint, Star, CheckCircle, X, Image } from 'lucide-react';

const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <div className="flex items-center gap-3">
      <Shield className="w-8 h-8 text-[#0057B8]" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">تدبير الفرق والأندية</h1>
        <p className="text-gray-500 font-normal mt-1">إضافة وتعديل بيانات الأندية المشاركة في العصبة.</p>
      </div>
    </div>
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="بحث عن فريق..."
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
        <span>إضافة فريق</span>
      </button>
    </div>
  </div>
);

const ClubTable: React.FC<{ clubs: Club[]; onEdit: (club: Club) => void; onDelete: (id: string) => void }> = ({ clubs, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز النادي</th>
                    <th scope="col" className="px-4 py-4 font-semibold">الشعار</th>
                    <th scope="col" className="px-6 py-4 font-semibold">اسم النادي (العربية)</th>
                    <th scope="col" className="px-6 py-4 font-semibold">اسم النادي بالفرنسية</th>
                    <th scope="col" className="px-6 py-4 font-semibold">رئيس النادي</th>
                    <th scope="col" className="px-6 py-4 font-semibold">المدرب</th>
                    <th scope="col" className="px-6 py-4 font-semibold">التصنيف</th>
                    <th scope="col" className="px-6 py-4 font-semibold">آخر تحديث</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                {clubs.map((club) => (
                    <tr key={club.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{club.id}</td>
                        <td className="px-4 py-2">
                             {club.logo ? (
                                <img src={club.logo} alt={`${club.nameAr} logo`} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs">
                                    {club.nameAr.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                </div>
                            )}
                        </td>
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{club.nameAr}</th>
                        <td className="px-6 py-4 font-medium">{club.nameFr}</td>
                        <td className="px-6 py-4 font-medium">{club.president}</td>
                        <td className="px-6 py-4 font-medium">{club.coach}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{club.classification}</span></td>
                        <td className="px-6 py-4 font-medium">{club.lastUpdate}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button className="p-2 text-gray-500 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                                <button onClick={() => onEdit(club)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(club.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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
            <input id={id} type={type} {...props} className={`w-full bg-white border border-gray-300 rounded-lg py-2 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] disabled:bg-gray-100 focus:shadow-md`} />
        </div>
    </div>
);

const FormSelect: React.FC<any> = ({ label, icon: Icon, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
             {Icon && <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><Icon className="w-5 h-5" /></span>}
            <select id={id} {...props} className={`w-full bg-white border border-gray-300 rounded-lg py-2.5 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] appearance-none focus:shadow-md`}>
                {children}
            </select>
        </div>
    </div>
);


const ClubForm: React.FC<{ club: Club; onSave: (club: Club) => void; onCancel: () => void }> = ({ club, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Club>(club);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/png', 'image/jpeg'].includes(file.type)) {
            alert('يرجى تحميل صورة بصيغة PNG أو JPG فقط.');
            e.target.value = '';
            return;
        }

        if (file.size > 1 * 1024 * 1024) {
            alert('حجم الملف يجب أن يكون أقل من 1MB.');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, logo: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({...formData, lastUpdate: new Date().toISOString().split('T')[0]});
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">معلومات عامة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="كود النادي" icon={Hash} id="id" name="id" value={formData.id} disabled />
                        <FormInput label="اسم الفريق (بالعربية)" icon={Tag} id="nameAr" name="nameAr" value={formData.nameAr} onChange={handleChange} required />
                        <FormInput label="Nom du club (بالفرنسية)" icon={Tag} id="nameFr" name="nameFr" value={formData.nameFr} onChange={handleChange} required />
                        <FormInput label="تاريخ التأسيس" icon={Calendar} id="foundationDate" name="foundationDate" type="date" value={formData.foundationDate} onChange={handleChange} />
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">شعار النادي</label>
                            <div className="flex items-center gap-4">
                                {formData.logo ? (
                                    <img src={formData.logo} alt="شعار النادي" className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200" />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed">
                                        <Image className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <input
                                        id="club-logo-upload"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleLogoChange}
                                        className="block w-full text-sm text-gray-500 file:cursor-pointer file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0057B8] hover:file:bg-blue-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG (بحد أقصى 1MB). الأبعاد: 2x2 سم (96x96 بكسل).</p>
                                </div>
                            </div>
                        </div>

                        <FormSelect label="البطولات" icon={Trophy} id="competitions" name="competitions" value={formData.competitions} onChange={handleChange} multiple className="h-24">
                            {COMPETITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </FormSelect>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">معلومات إدارية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="رئيس الفريق" icon={User} id="president" name="president" value={formData.president} onChange={handleChange} required />
                        <FormInput label="رقم البطاقة الوطنية" icon={Fingerprint} id="presidentId" name="presidentId" value={formData.presidentId} onChange={handleChange} />
                        <FormInput label="رقم الترخيص" icon={List} id="license" name="license" value={formData.license} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">معلومات تقنية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="اسم مدرب الفريق" icon={Users} id="coach" name="coach" value={formData.coach} onChange={handleChange} required />
                        <FormInput label="رقم بطاقة المدرب" icon={Fingerprint} id="coachId" name="coachId" value={formData.coachId} onChange={handleChange} />
                        <FormInput label="رقم ترخيص المدرب" icon={List} id="coachLicense" name="coachLicense" value={formData.coachLicense} onChange={handleChange} />
                        <FormSelect label="التصنيف الحالي" icon={Star} id="classification" name="classification" value={formData.classification} onChange={handleChange}>
                            {CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                        </FormSelect>
                        <FormInput label="تاريخ التحيين" icon={Calendar} id="lastUpdate" name="lastUpdate" value={formData.lastUpdate} disabled />
                    </div>
                </div>

                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ
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


const Clubs: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [clubs, setClubs] = useState<Club[]>(CLUBS_DATA);
    const [filteredClubs, setFilteredClubs] = useState<Club[]>(CLUBS_DATA);
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = clubs.filter(club =>
            club.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClubs(results);
    }, [searchTerm, clubs]);

    const handleAddNew = () => {
        setSelectedClub({
            id: `IC-${Math.floor(100000 + Math.random() * 900000)}`,
            nameAr: '', nameFr: '', president: '', coach: '', classification: CLASSIFICATIONS[0],
            lastUpdate: new Date().toISOString().split('T')[0], foundationDate: '', competitions: [],
            presidentId: '', license: '', coachId: '', coachLicense: '', logo: '',
        });
        setView('form');
    };
    
    const handleEdit = (club: Club) => {
        setSelectedClub(club);
        setView('form');
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا النادي؟')) {
            setClubs(prev => prev.filter(c => c.id !== id));
        }
    };

    const handleSave = (clubData: Club) => {
        const exists = clubs.some(c => c.id === clubData.id);
        if (exists) {
            setClubs(prev => prev.map(c => c.id === clubData.id ? clubData : c));
        } else {
            setClubs(prev => [...prev, clubData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedClub(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="تم حفظ بيانات الفريق بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <ClubTable clubs={filteredClubs} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedClub && <ClubForm club={selectedClub} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Clubs;
import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Championship } from '../types';
import { CHAMPIONSHIPS_DATA, CHAMPIONSHIP_CATEGORIES, CHAMPIONSHIP_GENDERS } from '../constants';
import { PlusCircle, Search, FileDown, Edit, Trash2, Trophy, Hash, Tag, Calendar, MapPin, Users, User, Handshake, UploadCloud, CheckCircle, X, Image as ImageIcon, Download } from 'lucide-react';

// PageHeader component
const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <div className="flex items-center gap-3">
      <Trophy className="w-8 h-8 text-[#0057B8]" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">تدبير البطولات</h1>
        <p className="text-gray-500 font-normal mt-1">إضافة وتعديل البطولات التي تنظمها العصبة.</p>
      </div>
    </div>
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="بحث عن بطولة..."
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
        <span>إضافة بطولة</span>
      </button>
    </div>
  </div>
);

// ChampionshipTable component
const ChampionshipTable: React.FC<{ championships: Championship[]; onEdit: (championship: Championship) => void; onDelete: (championshipCode: string) => void }> = ({ championships, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز البطولة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">اسم البطولة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">تاريخ الإضافة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">مكان إقامة البطولة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">فئات البطولة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الجنس</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الفئة العمرية</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الرعاة والشراكات</th>
                    <th scope="col" className="px-6 py-4 font-semibold">تحميل محضر البطولة</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                {championships.map((champ) => (
                    <tr key={champ.championshipCode} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{champ.championshipCode}</td>
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{champ.championshipName}</th>
                        <td className="px-6 py-4 font-medium">{champ.dateAdded}</td>
                        <td className="px-6 py-4 font-medium">{champ.venue}</td>
                        <td className="px-6 py-4"><div className="flex flex-wrap gap-1">{champ.categories.map(c => <span key={c} className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">{c}</span>)}</div></td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${champ.gender === 'ذكور' ? 'text-blue-800 bg-blue-100' : 'text-pink-800 bg-pink-100'}`}>{champ.gender}</span></td>
                        <td className="px-6 py-4 font-medium">{champ.ageGroup}</td>
                        <td className="px-6 py-4 font-medium truncate max-w-xs">{champ.sponsors}</td>
                        <td className="px-6 py-4 font-medium">
                            {champ.championshipReportName ? (
                                <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                    <Download className="w-4 h-4" />
                                    {champ.championshipReportName}
                                </button>
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onEdit(champ)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(champ.championshipCode)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Card>
);

// Reusable Form Components
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

const FormTextArea: React.FC<any> = ({ label, icon: Icon, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
            {Icon && <span className="absolute top-3 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><Icon className="w-5 h-5" /></span>}
            <textarea id={id} {...props} className={`w-full bg-white border border-gray-300 rounded-xl py-2 ${Icon ? 'ps-10' : 'ps-4'} pe-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#0057B8]/50 focus:border-[#0057B8] focus:shadow-md h-24 resize-none`} />
        </div>
    </div>
);

// ChampionshipForm component
const ChampionshipForm: React.FC<{ championship: Championship; onSave: (championship: Championship) => void; onCancel: () => void }> = ({ championship, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Championship>(championship);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name } = e.target;
        const selectedValues = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
        setFormData(prev => ({ ...prev, [name]: selectedValues }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'logo' | 'report') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (fileType === 'logo') {
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                alert('يرجى تحميل صورة بصيغة PNG أو JPG.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, championshipLogo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        } else if (fileType === 'report') {
             if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
                alert('يرجى تحميل ملف بصيغة PDF أو DOC.');
                return;
            }
            setFormData(prev => ({ ...prev, championshipReportName: file.name }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.championshipName) {
            alert('اسم البطولة حقل مطلوب.');
            return;
        }
        onSave(formData);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">شعار البطولة</label>
                        <div className="flex items-center gap-4">
                            {formData.championshipLogo ? (
                                <img src={formData.championshipLogo} alt="شعار البطولة" className="w-20 h-20 rounded-lg object-contain border-2 border-gray-200 p-1" />
                            ) : (
                                <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed">
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                </div>
                            )}
                            <input
                                id="championship-logo-upload"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => handleFileChange(e, 'logo')}
                                className="block w-full text-sm text-gray-500 file:cursor-pointer file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0057B8] hover:file:bg-blue-100"
                            />
                        </div>
                    </div>
                    <FormInput label="رمز البطولة" icon={Hash} id="championshipCode" name="championshipCode" value={formData.championshipCode} disabled />
                    <FormInput label="اسم البطولة" icon={Tag} id="championshipName" name="championshipName" value={formData.championshipName} onChange={handleChange} required />
                    <FormInput label="تاريخ الإضافة" icon={Calendar} id="dateAdded" name="dateAdded" type="date" value={formData.dateAdded} onChange={handleChange} />
                    <FormInput label="مكان إقامة البطولة" icon={MapPin} id="venue" name="venue" value={formData.venue} onChange={handleChange} />
                     <FormSelect label="فئات البطولة" icon={Users} id="categories" name="categories" value={formData.categories} onChange={handleMultiSelectChange} multiple className="h-28">
                        {CHAMPIONSHIP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </FormSelect>
                    <FormSelect label="الجنس" icon={User} id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        {CHAMPIONSHIP_GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                    </FormSelect>
                    <FormInput label="الفئة العمرية" icon={User} id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} />
                    <div className="md:col-span-2">
                        <FormTextArea label="الرعاة والشراكات" icon={Handshake} id="sponsors" name="sponsors" value={formData.sponsors} onChange={handleChange} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="championshipReport" className="block text-sm font-semibold text-gray-700 mb-2">تحميل محضر البطولة</label>
                        <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#0057B8]/50 focus-within:border-[#0057B8] focus-within:shadow-md">
                            <UploadCloud className="w-5 h-5 text-gray-400"/>
                             <div className="flex-grow">
                                <input
                                    id="championshipReport"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => handleFileChange(e, 'report')}
                                    className="block w-full text-sm text-gray-500 file:cursor-pointer file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0057B8] hover:file:bg-blue-100"
                                />
                                {formData.championshipReportName && <span className="text-xs font-medium text-gray-600 mt-1">{formData.championshipReportName}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ البطولة
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        <X className="w-5 h-5" /> إلغاء
                    </button>
                </div>
            </form>
        </Card>
    );
};

// Toast component
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed bottom-5 left-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl flex items-center gap-3 z-50 font-semibold">
        <CheckCircle className="w-6 h-6" />
        <span>{message}</span>
        <button onClick={onClose} className="absolute top-1 right-1 text-white/70 hover:text-white">&times;</button>
    </div>
);


// Main Championships component
const Championships: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [championships, setChampionships] = useState<Championship[]>(CHAMPIONSHIPS_DATA);
    const [filteredChampionships, setFilteredChampionships] = useState<Championship[]>(CHAMPIONSHIPS_DATA);
    const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = championships.filter(champ =>
            champ.championshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            champ.championshipCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredChampionships(results);
    }, [searchTerm, championships]);

    const handleAddNew = () => {
        const lastCodeNum = championships.reduce((max, c) => {
            const num = parseInt(c.championshipCode.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
        const newCode = `CL-${String(lastCodeNum + 1).padStart(5, '0')}`;
        
        setSelectedChampionship({
            championshipCode: newCode,
            championshipName: '',
            dateAdded: new Date().toISOString().split('T')[0],
            venue: '',
            categories: [],
            gender: CHAMPIONSHIP_GENDERS[0],
            ageGroup: '',
            sponsors: '',
        });
        setView('form');
    };
    
    const handleEdit = (championship: Championship) => {
        setSelectedChampionship(championship);
        setView('form');
    };
    
    const handleDelete = (championshipCode: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه البطولة؟')) {
            setChampionships(prev => prev.filter(c => c.championshipCode !== championshipCode));
        }
    };

    const handleSave = (championshipData: Championship) => {
        const exists = championships.some(c => c.championshipCode === championshipData.championshipCode);
        if (exists) {
            setChampionships(prev => prev.map(c => c.championshipCode === championshipData.championshipCode ? championshipData : c));
        } else {
            setChampionships(prev => [...prev, championshipData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedChampionship(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="✅ تم حفظ البطولة بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <ChampionshipTable championships={filteredChampionships} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedChampionship && <ChampionshipForm championship={selectedChampionship} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Championships;

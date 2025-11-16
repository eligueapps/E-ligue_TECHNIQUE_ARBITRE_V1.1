import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Match, MatchStatus } from '../types';
import { MATCHES_DATA, MATCH_STAGES, MATCH_STATUSES, MATCH_CATEGORIES, CHAMPIONSHIPS_DATA, CLUBS_DATA, FIELDS_DATA } from '../constants';
import { PlusCircle, Search, FileDown, Edit, Trash2, Swords, Hash, Trophy, List, Shield, Calendar, Clock, MapPin, Home, IterationCw, CircleDot, CheckCircle, X, MessageSquare } from 'lucide-react';

// PageHeader component
const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <div className="flex items-center gap-3">
      <Swords className="w-8 h-8 text-[#0057B8]" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">برمجة المباريات</h1>
        <p className="text-gray-500 font-normal mt-1">إضافة وتعديل المباريات المبرمجة في بطولات العصبة.</p>
      </div>
    </div>
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="بحث عن مباراة..."
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
        <span>برمجة مباراة</span>
      </button>
    </div>
  </div>
);

const getStatusClass = (status: MatchStatus) => {
    switch (status) {
        case 'مبرمجة': return 'bg-green-100 text-green-800';
        case 'مؤجلة': return 'bg-yellow-100 text-yellow-800';
        case 'ملغاة': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

// MatchTable component
const MatchTable: React.FC<{ matches: Match[]; onEdit: (match: Match) => void; onDelete: (matchCode: string) => void }> = ({ matches, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز المباراة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الفئة / البطولة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الفريق المضيف</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الفريق الزائر</th>
                    <th scope="col" className="px-6 py-4 font-semibold">المرحلة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الدورة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الملعب / المدينة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">التاريخ والوقت</th>
                    <th scope="col" className="px-6 py-4 font-semibold">حالة المباراة</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match) => (
                    <tr key={match.matchCode} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{match.matchCode}</td>
                        <td className="px-6 py-4">
                            <div className="font-semibold text-gray-800">{match.championship}</div>
                            <div className="text-xs text-gray-500">{match.category}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{match.homeTeam}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{match.awayTeam}</td>
                        <td className="px-6 py-4 font-medium">{match.stage}</td>
                        <td className="px-6 py-4 font-medium">{match.cycle}</td>
                        <td className="px-6 py-4">
                             <div className="font-medium text-gray-800">{match.stadium}</div>
                            <div className="text-xs text-gray-500">{match.city}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="font-medium text-gray-800" dir="ltr">{match.matchDate}</div>
                            <div className="text-xs text-gray-500" dir="ltr">{match.matchTime}</div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(match.status)}`}>{match.status}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onEdit(match)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(match.matchCode)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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

// MatchForm component
const MatchForm: React.FC<{ match: Match; onSave: (match: Match) => void; onCancel: () => void }> = ({ match, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Match>(match);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'stadium') {
            const selectedField = FIELDS_DATA.find(f => f.name === value);
            setFormData(prev => ({
                ...prev,
                stadium: value,
                city: selectedField ? selectedField.city : ''
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields: (keyof Match)[] = ['championship', 'category', 'homeTeam', 'awayTeam', 'matchDate', 'matchTime', 'stadium', 'stage', 'cycle'];
        
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert('يرجى ملء جميع الحقول المطلوبة.');
                return;
            }
        }
        
        if (formData.homeTeam === formData.awayTeam) {
            alert('الفريق المضيف يجب أن يكون مختلفًا عن الفريق الزائر.');
            return;
        }
        onSave(formData);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <FormInput label="رمز المباراة" icon={Hash} id="matchCode" name="matchCode" value={formData.matchCode} disabled />
                    <FormSelect label="البطولة" icon={Trophy} id="championship" name="championship" value={formData.championship} onChange={handleChange} required>
                         <option value="">-- اختر البطولة --</option>
                        {CHAMPIONSHIPS_DATA.map(c => <option key={c.championshipCode} value={c.championshipName}>{c.championshipName}</option>)}
                    </FormSelect>
                     <FormSelect label="الفئة" icon={List} id="category" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">-- اختر الفئة --</option>
                        {MATCH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </FormSelect>
                     <FormSelect label="المرحلة" icon={IterationCw} id="stage" name="stage" value={formData.stage} onChange={handleChange} required>
                        {MATCH_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </FormSelect>
                     <FormSelect label="الفريق المضيف" icon={Shield} id="homeTeam" name="homeTeam" value={formData.homeTeam} onChange={handleChange} required>
                         <option value="">-- اختر الفريق المضيف --</option>
                        {CLUBS_DATA.map(c => <option key={c.id} value={c.nameAr}>{c.nameAr}</option>)}
                    </FormSelect>
                     <FormSelect label="الفريق الزائر" icon={Shield} id="awayTeam" name="awayTeam" value={formData.awayTeam} onChange={handleChange} required>
                        <option value="">-- اختر الفريق الزائر --</option>
                        {CLUBS_DATA.map(c => <option key={c.id} value={c.nameAr}>{c.nameAr}</option>)}
                    </FormSelect>
                     <FormInput label="تاريخ المباراة" icon={Calendar} id="matchDate" name="matchDate" type="date" value={formData.matchDate} onChange={handleChange} required />
                     <FormInput label="توقيت المباراة" icon={Clock} id="matchTime" name="matchTime" type="time" value={formData.matchTime} onChange={handleChange} required />
                     <FormSelect label="الملعب" icon={MapPin} id="stadium" name="stadium" value={formData.stadium} onChange={handleChange} required>
                         <option value="">-- اختر الملعب --</option>
                        {FIELDS_DATA.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                    </FormSelect>
                    <FormInput label="المدينة" icon={Home} id="city" name="city" value={formData.city} disabled />
                    <FormInput label="الدورة" icon={List} id="cycle" name="cycle" value={formData.cycle} onChange={handleChange} placeholder="مثال: الجولة الأولى" required />
                     <FormSelect label="حالة المباراة" icon={CircleDot} id="status" name="status" value={formData.status} onChange={handleChange}>
                        {MATCH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </FormSelect>
                    <div className="md:col-span-2">
                        <FormTextArea label="ملاحظات" icon={MessageSquare} id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ المباراة
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


// Main Matches component
const Matches: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [matches, setMatches] = useState<Match[]>(MATCHES_DATA);
    const [filteredMatches, setFilteredMatches] = useState<Match[]>(MATCHES_DATA);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = matches.filter(match =>
            match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.championship.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.matchCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMatches(results);
    }, [searchTerm, matches]);

    const handleAddNew = () => {
        const lastCodeNum = matches.reduce((max, m) => {
            const num = parseInt(m.matchCode.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
        const newCode = `M-${String(lastCodeNum + 1).padStart(5, '0')}`;
        
        setSelectedMatch({
            matchCode: newCode,
            championship: '',
            category: MATCH_CATEGORIES[0],
            homeTeam: '',
            awayTeam: '',
            matchDate: new Date().toISOString().split('T')[0],
            matchTime: '15:00',
            stadium: '',
            city: '',
            stage: MATCH_STAGES[0],
            cycle: '',
            status: MATCH_STATUSES[0],
            notes: '',
        });
        setView('form');
    };
    
    const handleEdit = (match: Match) => {
        setSelectedMatch(match);
        setView('form');
    };
    
    const handleDelete = (matchCode: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه المباراة؟')) {
            setMatches(prev => prev.filter(m => m.matchCode !== matchCode));
        }
    };

    const handleSave = (matchData: Match) => {
        const exists = matches.some(m => m.matchCode === matchData.matchCode);
        if (exists) {
            setMatches(prev => prev.map(m => m.matchCode === matchData.matchCode ? matchData : m));
        } else {
            setMatches(prev => [...prev, matchData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedMatch(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="✅ تم برمجة المباراة بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <MatchTable matches={filteredMatches} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedMatch && <MatchForm match={selectedMatch} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Matches;
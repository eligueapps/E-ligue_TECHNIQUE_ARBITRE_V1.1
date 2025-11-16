import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import { Field } from '../types';
import { TECHNICAL_CONDITIONS, FIELDS_DATA } from '../constants';
import { Building, Hash, ClipboardType, Building2, MapPin, Map, Home, Link, Wrench, Users2, CheckCircle, X, PlusCircle, Search, FileDown, Eye, Edit, Trash2 } from 'lucide-react';

const PageHeader: React.FC<{ onAddNew: () => void; onSearch: (term: string) => void }> = ({ onAddNew, onSearch }) => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Building className="w-8 h-8 text-[#0057B8]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة البنية التحتية</h1>
          <p className="text-gray-500 font-normal mt-1">إضافة وتدبير الملاعب والمرافق الرياضية.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="بحث عن ملعب..."
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
          <span>إضافة ملعب</span>
        </button>
      </div>
    </div>
);

const FieldTable: React.FC<{ fields: Field[]; onEdit: (field: Field) => void; onDelete: (id: string) => void }> = ({ fields, onEdit, onDelete }) => (
    <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm text-right text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">رمز الملعب</th>
                    <th scope="col" className="px-6 py-4 font-semibold">اسم الملعب</th>
                    <th scope="col" className="px-6 py-4 font-semibold">المدينة</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الحالة التقنية</th>
                    <th scope="col" className="px-6 py-4 font-semibold">الطاقة الاستيعابية</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">إجراءات</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((field) => (
                    <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono font-medium text-gray-700">{field.id}</td>
                        <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{field.name}</th>
                        <td className="px-6 py-4 font-medium">{field.city}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                field.condition === 'جيدة' ? 'bg-green-100 text-green-800' :
                                field.condition === 'تحتاج صيانة' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>{field.condition}</span>
                        </td>
                        <td className="px-6 py-4 font-medium">{field.capacity.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <a href={field.coordinates} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-600"><MapPin className="w-4 h-4" /></a>
                                <button onClick={() => onEdit(field)} className="p-2 text-gray-500 hover:text-yellow-600"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => onDelete(field.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
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

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed bottom-5 left-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl flex items-center gap-3 z-50 font-semibold">
        <CheckCircle className="w-6 h-6" />
        <span>{message}</span>
        <button onClick={onClose} className="absolute top-1 right-1 text-white/70 hover:text-white">&times;</button>
    </div>
);


const FieldForm: React.FC<{ field: Field; onSave: (field: Field) => void; onCancel: () => void }> = ({ field, onSave, onCancel }) => {
    const [fieldData, setFieldData] = useState<Field>(field);

    useEffect(() => {
        setFieldData(field);
    }, [field]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFieldData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value 
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(fieldData);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">{field.id.startsWith('IT-') ? 'تعديل بيانات الملعب' : 'إضافة ملعب جديد'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <FormInput label="رمز الملعب" icon={Hash} id="id" name="id" value={fieldData.id} disabled />
                    <FormInput label="اسم الملعب" icon={ClipboardType} id="name" name="name" value={fieldData.name} onChange={handleChange} required />
                    <FormInput label="الجهة المكلفة بالتدبير" icon={Building2} id="authority" name="authority" value={fieldData.authority} onChange={handleChange} required />
                    <FormInput label="موقع الملعب" icon={MapPin} id="location" name="location" value={fieldData.location} onChange={handleChange} required />
                    <FormInput label="الجماعة" icon={Map} id="commune" name="commune" value={fieldData.commune} onChange={handleChange} required />
                    <FormInput label="المدينة" icon={Home} id="city" name="city" value={fieldData.city} onChange={handleChange} required />
                    <FormInput label="الاحداثيات (رابط Google Maps)" icon={Link} id="coordinates" name="coordinates" type="url" value={fieldData.coordinates} onChange={handleChange} placeholder="https://maps.app.goo.gl/..." />
                    <FormSelect label="الحالة التقنية" icon={Wrench} id="condition" name="condition" value={fieldData.condition} onChange={handleChange}>
                        {TECHNICAL_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </FormSelect>
                    <FormInput label="الطاقة الاستيعابية" icon={Users2} id="capacity" name="capacity" type="number" min="0" value={fieldData.capacity} onChange={handleChange} required />
                </div>
                {fieldData.coordinates && (
                    <div className="text-sm">
                        <a href={fieldData.coordinates} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> معاينة الموقع على الخريطة
                        </a>
                    </div>
                )}
                <div className="flex justify-start gap-3 pt-4 border-t">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-[#0057B8] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        <CheckCircle className="w-5 h-5" /> حفظ الملعب
                    </button>
                    <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        <X className="w-5 h-5" /> إلغاء
                    </button>
                </div>
            </form>
        </Card>
    )
};


const Infrastructure: React.FC = () => {
    const [view, setView] = useState<'table' | 'form'>('table');
    const [fields, setFields] = useState<Field[]>(FIELDS_DATA);
    const [filteredFields, setFilteredFields] = useState<Field[]>(FIELDS_DATA);
    const [selectedField, setSelectedField] = useState<Field | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const results = fields.filter(field =>
            field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            field.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFields(results);
    }, [searchTerm, fields]);

    const handleAddNew = () => {
        setSelectedField({
            id: `IT-${Math.floor(100000 + Math.random() * 900000)}`,
            name: '', authority: '', location: '', commune: '', city: '', coordinates: '',
            condition: TECHNICAL_CONDITIONS[0], capacity: 0,
        });
        setView('form');
    };
    
    const handleEdit = (field: Field) => {
        setSelectedField(field);
        setView('form');
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الملعب؟')) {
            setFields(prev => prev.filter(f => f.id !== id));
        }
    };

    const handleSave = (fieldData: Field) => {
        const exists = fields.some(f => f.id === fieldData.id);
        if (exists) {
            setFields(prev => prev.map(f => f.id === fieldData.id ? fieldData : f));
        } else {
            setFields(prev => [...prev, fieldData]);
        }
        setView('table');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleCancel = () => {
        setSelectedField(null);
        setView('table');
    };

    return (
        <div className="space-y-6">
            <PageHeader onAddNew={handleAddNew} onSearch={setSearchTerm} />
            
            {showToast && <Toast message="تم حفظ الملعب بنجاح" onClose={() => setShowToast(false)} />}
            
            {view === 'table' && <FieldTable fields={filteredFields} onEdit={handleEdit} onDelete={handleDelete} />}
            
            {view === 'form' && selectedField && <FieldForm field={selectedField} onSave={handleSave} onCancel={handleCancel} />}
        </div>
    );
};

export default Infrastructure;
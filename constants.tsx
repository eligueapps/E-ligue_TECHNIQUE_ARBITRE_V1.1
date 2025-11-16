import {
  LayoutDashboard,
  Swords,
  Award,
  Shield,
  Landmark,
  ClipboardList,
  Gavel,
  Settings,
  FileText,
  DollarSign,
  AlertTriangle,
  Building,
  UserCheck,
  Trophy,
} from 'lucide-react';
import { NavItem, KpiCardData, Club, Field, Referee, Delegate, Championship, Match, MatchStatus, MatchStage } from './types';

export const NAV_ITEMS: NavItem[] = [
  { key: 'Dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { key: 'Matches', label: 'المباريات', icon: Swords },
  { key: 'Championships', label: 'البطولات', icon: Trophy },
  { key: 'Refereeing', label: 'التحكيم', icon: Award },
  { key: 'Clubs', label: 'الأندية', icon: Shield },
  { key: 'Delegates', label: 'المناديب', icon: UserCheck },
  { key: 'Finance', label: 'المالية', icon: Landmark },
  { key: 'TechnicalCommittee', label: 'اللجنة التقنية', icon: ClipboardList },
  { key: 'DisciplinaryCommittee', label: 'اللجنة التأديبية', icon: Gavel },
  { key: 'Infrastructure', label: 'البنية التحتية', icon: Building },
  { key: 'Settings', label: 'الإعدادات', icon: Settings },
];

export const KPI_DATA: KpiCardData[] = [
    { title: 'مجموع المباريات', value: '1,250', icon: Swords, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'إجمالي الحكام', value: '120', icon: Award, color: 'text-teal-600', bgColor: 'bg-teal-100' },
    { title: 'التقارير المقدمة', value: '985', icon: FileText, color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { title: 'الوضع المالي', value: '75,000 درهم', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'الإجراءات التأديبية', value: '42', icon: Gavel, color: 'text-red-600', bgColor: 'bg-red-100' },
];

export const CHART_DATA = [
  { name: 'يناير', matches: 30, reports: 24 },
  { name: 'فبراير', matches: 45, reports: 38 },
  { name: 'مارس', matches: 60, reports: 55 },
  { name: 'أبريل', matches: 52, reports: 48 },
  { name: 'مايو', matches: 78, reports: 70 },
  { name: 'يونيو', matches: 40, reports: 35 },
];

export const RECENT_ACTIVITIES = [
    { id: 1, text: 'تم تعيين حكم جديد للمباراة #1024' },
    { id: 2, text: 'تقرير مباراة #980 قيد المراجعة' },
    { id: 3, text: 'تم تحديث الجدول المالي لشهر مايو' },
    { id: 4, text: 'عقوبة جديدة صدرت بحق نادي الأمل' },
];

export const ALERTS = [
    { id: 1, text: 'تقرير مباراة #991 متأخر', level: 'high' },
    { id: 2, text: 'مباراة مقررة غدًا: نادي الاتحاد ضد نادي الشباب', level: 'medium' },
    { id: 3, text: 'مستحقات مالية معلقة لنادي النجوم', level: 'high' },
];


export const CLASSIFICATIONS = ['القسم الأول', 'القسم الثاني', 'القسم الثالث', 'الهواة'];
export const COMPETITIONS = ['البطولة الوطنية', 'كأس العرش', 'بطولة الشباب'];

export const CLUBS_DATA: Club[] = [
  { id: 'IC-202401', nameAr: 'نادي الاتحاد الرياضي', nameFr: 'Union Sportive Club', president: 'أحمد العلوي', coach: 'رشيد السليماني', classification: 'القسم الأول', lastUpdate: '2024-05-20', foundationDate: '1985-03-15', competitions: ['البطولة الوطنية', 'كأس العرش'], presidentId: 'A123456', license: 'L-7890', coachId: 'B789012', coachLicense: 'CL-4567' },
  { id: 'IC-202402', nameAr: 'شباب أطلس', nameFr: 'Jeunesse Atlas', president: 'فاطمة الزهراء', coach: 'يوسف حمدان', classification: 'القسم الأول', lastUpdate: '2024-05-18', foundationDate: '1992-07-22', competitions: ['البطولة الوطنية'], presidentId: 'C456789', license: 'L-1234', coachId: 'D901234', coachLicense: 'CL-8901' },
  { id: 'IC-202403', nameAr: 'نادي الأمل', nameFr: 'Espoir Club', president: 'محمد كريمي', coach: 'عمر الشريف', classification: 'القسم الثاني', lastUpdate: '2024-05-21', foundationDate: '2001-11-10', competitions: ['البطولة الوطنية', 'بطولة الشباب'], presidentId: 'E678901', license: 'L-5678', coachId: 'F123456', coachLicense: 'CL-2345' },
  { id: 'IC-202404', nameAr: 'نجوم المستقبل', nameFr: 'Future Stars', president: 'حسن الإدريسي', coach: 'خالد بناني', classification: 'القسم الثاني', lastUpdate: '2024-05-19', foundationDate: '2005-01-30', competitions: ['البطولة الوطنية'], presidentId: 'G890123', license: 'L-9012', coachId: 'H789012', coachLicense: 'CL-6789' },
  { id: 'IC-202405', nameAr: 'النهضة الرياضية', nameFr: 'Renaissance Sportive', president: 'ليلى فوزي', coach: 'عبد الله المريني', classification: 'القسم الثالث', lastUpdate: '2024-05-22', foundationDate: '1998-06-01', competitions: ['بطولة الشباب'], presidentId: 'I234567', license: 'L-3456', coachId: 'J901234', coachLicense: 'CL-0123' },
];

export const TECHNICAL_CONDITIONS = ['جيدة', 'تحتاج صيانة', 'مغلق'];

export const FIELDS_DATA: Field[] = [
    { id: 'IT-202401', name: 'الملعب الشرفي', authority: 'الجماعة الحضرية', location: 'وسط المدينة', commune: 'الرشيدية', city: 'الرشيدية', coordinates: 'https://maps.app.goo.gl/example1', condition: 'جيدة', capacity: 5000 },
    { id: 'IT-202402', name: 'ملعب النخيل', authority: 'نادي رياضي', location: 'الحي الجديد', commune: 'أرفود', city: 'أرفود', coordinates: 'https://maps.app.goo.gl/example2', condition: 'تحتاج صيانة', capacity: 2000 },
    { id: 'IT-202403', name: 'الملعب البلدي', authority: 'الجماعة الحضرية', location: 'حي المسيرة', commune: 'ورزازات', city: 'ورزازات', coordinates: 'https://maps.app.goo.gl/example3', condition: 'جيدة', capacity: 3500 },
];

export const GENDERS = ['ذكر', 'أنثى'];
export const MARITAL_STATUSES = ['أعزب', 'متزوج', 'آخر'];
export const REFEREE_CLASSIFICATIONS = ['وطني', 'القسم الأول', 'القسم الثاني'];
export const REFEREE_ROLES = ['حكم كرة القدم 11', 'حكم مساعد كرة القدم 11', 'حكم كرة الصالات', 'حكم كرة القدم الشاطئية'];
export const REFEREE_BRANCHES = ['درعة', 'تافيلالت'];

export const REFEREES_DATA: Referee[] = [
    { refereeCode: 'IA-00001', fullNameAr: 'علي بناني', fullNameFr: 'Ali Bennani', dateOfBirth: '1988-05-15', placeOfBirth: 'الرشيدية', nationalId: 'A123456', gender: 'ذكر', profession: 'أستاذ', maritalStatus: 'متزوج', address: 'حي المسيرة، الرشيدية', bankAccountNumber: '123456789012345678901234', licenseNumber: 'LIC-9876', startDate: '2010-09-01', classification: 'وطني', role: 'حكم كرة القدم 11', branch: 'تافيلالت' },
    { refereeCode: 'IA-00002', fullNameAr: 'فاطمة حمدي', fullNameFr: 'Fatima Hamdi', dateOfBirth: '1992-11-20', placeOfBirth: 'ورزازات', nationalId: 'B789012', gender: 'أنثى', profession: 'مهندسة', maritalStatus: 'أعزب', address: 'شارع النخيل، ورزازات', bankAccountNumber: '987654321098765432109876', licenseNumber: 'LIC-5432', startDate: '2015-03-10', classification: 'القسم الأول', role: 'حكم مساعد كرة القدم 11', branch: 'درعة' },
];

export const DELEGATES_DATA: Delegate[] = [
    { delegateCode: 'MD-00001', fullNameAr: 'يوسف العلمي', fullNameFr: 'Youssef Alami', nationalId: 'D123456', email: 'y.alami@email.com', phone: '0612345678', bankAccountNumber: '112233445566778899001122', rank: 'مندوب', permissions: { enterResults: true, uploadReports: true, followDisciplinary: false, sendNotifications: true } },
    { delegateCode: 'MD-00002', fullNameAr: 'خديجة المرنيسي', fullNameFr: 'Khadija Mernissi', nationalId: 'E789012', email: 'k.mernissi@email.com', phone: '0698765432', bankAccountNumber: '998877665544332211009988', rank: 'مندوب', permissions: { enterResults: true, uploadReports: true, followDisciplinary: true, sendNotifications: false } },
];

export const DELEGATE_PERMISSIONS_OPTIONS: { key: keyof Delegate['permissions']; label: string }[] = [
    { key: 'enterResults', label: 'إدخال نتائج المباريات' },
    { key: 'uploadReports', label: 'رفع محاضر المباريات' },
    { key: 'followDisciplinary', label: 'متابعة العقوبات' },
    { key: 'sendNotifications', label: 'إرسال إشعارات للأندية' },
];

export const CHAMPIONSHIP_CATEGORIES = ['القسم الأول', 'القسم الثاني', 'الهواة', 'الشباب', 'الناشئين'];
export const CHAMPIONSHIP_GENDERS = ['ذكور', 'إناث'];

export const CHAMPIONSHIPS_DATA: Championship[] = [
  {
    championshipCode: 'CL-00001',
    championshipName: 'بطولة كأس العرش 2024',
    dateAdded: '2024-03-10',
    venue: 'ملاعب متعددة',
    categories: ['القسم الأول', 'القسم الثاني'],
    gender: 'ذكور',
    ageGroup: 'الكبار',
    sponsors: 'اتصالات المغرب, كوكاكولا',
    championshipReportName: 'report_cas_2024.pdf'
  },
  {
    championshipCode: 'CL-00002',
    championshipName: 'بطولة الشباب الوطنية',
    dateAdded: '2024-04-01',
    venue: 'المركب الرياضي ورزازات',
    categories: ['الشباب'],
    gender: 'ذكور',
    ageGroup: 'تحت 19 سنة',
    sponsors: 'وزارة الشباب والرياضة',
    championshipReportName: 'report_jeunes_2024.pdf'
  },
    {
    championshipCode: 'CL-00003',
    championshipName: 'بطولة كرة القدم النسوية',
    dateAdded: '2024-05-15',
    venue: 'الملعب البلدي الرشيدية',
    categories: ['الهواة'],
    gender: 'إناث',
    ageGroup: 'الكبار',
    sponsors: 'مجموعة OCP',
  }
];

// Matches Constants
export const MATCH_STAGES: MatchStage[] = ['ذهاب', 'إياب'];
export const MATCH_STATUSES: MatchStatus[] = ['مبرمجة', 'مؤجلة', 'ملغاة'];
export const MATCH_CATEGORIES = ['كبار', 'أقل من 18', 'أقل من 16'];

export const MATCHES_DATA: Match[] = [
    {
        matchCode: 'M-00001',
        championship: 'بطولة كأس العرش 2024',
        category: 'كبار',
        homeTeam: 'نادي الاتحاد الرياضي',
        awayTeam: 'شباب أطلس',
        matchDate: '2024-06-15',
        matchTime: '17:00',
        stadium: 'الملعب الشرفي',
        city: 'الرشيدية',
        stage: 'ذهاب',
        cycle: 'الجولة الأولى',
        status: 'مبرمجة',
    },
    {
        matchCode: 'M-00002',
        championship: 'بطولة الشباب الوطنية',
        category: 'أقل من 18',
        homeTeam: 'نادي الأمل',
        awayTeam: 'نجوم المستقبل',
        matchDate: '2024-06-16',
        matchTime: '15:00',
        stadium: 'الملعب البلدي',
        city: 'ورزازات',
        stage: 'ذهاب',
        cycle: 'الجولة الأولى',
        status: 'مؤجلة',
        notes: 'تم التأجيل بسبب سوء الأحوال الجوية.'
    },
    {
        matchCode: 'M-00003',
        championship: 'بطولة كأس العرش 2024',
        category: 'كبار',
        homeTeam: 'شباب أطلس',
        awayTeam: 'نادي الاتحاد الرياضي',
        matchDate: '2024-07-22',
        matchTime: '20:00',
        stadium: 'ملعب النخيل',
        city: 'أرفود',
        stage: 'إياب',
        cycle: 'الجولة الثانية',
        status: 'ملغاة',
    }
];
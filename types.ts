import { LucideProps } from 'lucide-react';
import React from 'react';

export type Page = 
  | 'Dashboard' 
  | 'Matches' 
  | 'Championships'
  | 'Refereeing' 
  | 'Clubs' 
  | 'Finance' 
  | 'TechnicalCommittee' 
  | 'DisciplinaryCommittee'
  | 'Infrastructure'
  | 'Delegates'
  | 'Users'
  | 'Settings';

export interface NavItem {
  key: Page;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export interface KpiCardData {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

export interface Club {
  id: string;
  nameAr: string;
  nameFr: string;
  president: string;
  coach: string;
  classification: string;
  lastUpdate: string;
  foundationDate: string;
  competitions: string[];
  presidentId: string;
  license: string;
  coachId: string;
  coachLicense: string;
  logo?: string;
}

export interface Field {
  id: string;
  name: string;
  authority: string;
  location: string;
  commune: string;
  city: string;
  coordinates: string;
  condition: string;
  capacity: number;
}

export interface Referee {
  refereeCode: string;
  profilePicture?: string;
  fullNameAr: string;
  fullNameFr: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationalId: string;
  gender: string;
  profession: string;
  maritalStatus: string;
  address: string;
  bankAccountNumber: string;
  licenseNumber: string;
  startDate: string;
  classification: string;
  role: string;
  branch: string;
}

export interface Delegate {
  delegateCode: string;
  fullNameAr: string;
  fullNameFr: string;
  nationalId: string;
  email: string;
  phone: string;
  bankAccountNumber: string;
  rank: string;
  permissions: {
    enterResults: boolean;
    uploadReports: boolean;
    followDisciplinary: boolean;
    sendNotifications: boolean;
  };
}

export interface Championship {
  championshipCode: string;
  championshipLogo?: string;
  championshipName: string;
  dateAdded: string;
  venue: string;
  categories: string[];
  gender: string;
  ageGroup: string;
  sponsors: string;
  championshipReportName?: string;
}

export type MatchStatus = 'مبرمجة' | 'مؤجلة' | 'ملغاة';
export type MatchStage = 'ذهاب' | 'إياب';

export interface Match {
  matchCode: string;
  championship: string;
  category: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  matchTime: string;
  stadium: string;
  city: string;
  stage: MatchStage;
  cycle: string;
  status: MatchStatus;
  notes?: string;
}

export interface User {
    id: number;
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    username: string;
    password?: string; // Should be hashed in a real app
    permissions: Page[];
    role: string;
}

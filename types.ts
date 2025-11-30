export type TabId = 'personal-info' | 'education' | 'career-links';

export interface PersonalInfo {
  summary: string;
  email: string;
  contact: string;
  whatsapp: string;
  dob: string;
  gender: string;
  category: string;
  disability: string;
  address: string;
  city: string;
  state: string;
}

export interface EducationItem {
  id: string;
  title: string;
  bgImage: string;
  details: { label: string; value: string; isLink?: boolean; linkUrl?: string }[];
}

export interface CareerItem {
  id: string;
  title: string;
  type: string;
  focus: string;
  skills: string;
  linkUrl: string;
  colorClass: string; // For the visual accent color (e.g., 'text-green-500')
}

export interface LinkItem {
  label: string;
  url: string;
  iconColorClass: string;
  linkText: string;
}

export interface ProfileData {
  personal: PersonalInfo;
  education: EducationItem[];
  career: {
    currentRole: { label: string; value: string }[];
    links: LinkItem[];
    certifications: CareerItem[];
    internships: CareerItem[];
  };
}
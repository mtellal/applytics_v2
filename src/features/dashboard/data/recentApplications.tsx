import quonto from '@/assets/companies/quonto.svg';
import alan from '@/assets/companies/alan.webp';
import doctolib from '@/assets/companies/doctolib.svg';
import backMarket from '@/assets/companies/backMarket.png';
import swile from '@/assets/companies/swile.svg';
import type { Application } from '@/models/applications';

export const recentApplicationsMock: Application[] = [
  {
    id: '1',
    company: 'Qonto',
    companyLogo: quonto,
    position: 'Full Stack Developer',
    status: 'interview',
    appliedAt: '2024-09-04',
    location: 'Paris, France',
    link: '',
  },
  {
    id: '2',
    company: 'Alan',
    companyLogo: alan,
    position: 'Frontend Developer',
    status: 'in-progress',
    appliedAt: '2024-09-02',
    location: 'Paris, France',
    link: '',
  },
  {
    id: '3',
    company: 'Doctolib',
    companyLogo: doctolib,
    position: 'Software Engineer',
    status: 'rejected',
    appliedAt: '2024-08-31',
    location: 'Nantes, France',
    link: '',
  },
  {
    id: '4',
    company: 'Back Market',
    companyLogo: backMarket,
    position: 'React Developer',
    status: 'in-progress',
    appliedAt: '2024-08-28',
    link: '',
    location: 'Remote',
  },
  {
    id: '5',
    company: 'Swile',
    companyLogo: swile,
    position: 'Frontend Developer',
    status: 'in-progress',
    appliedAt: '2024-08-25',
    link: '',
    location: 'Paris, France',
  },
];

export type ApplicationStatus = 'to_apply' | 'applied' | 'interview' | 'offer' | 'rejected';

export type Application = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: string;
  location?: string;
  jobUrl?: string;
  notes?: string;
};

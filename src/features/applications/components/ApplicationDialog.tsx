import { useEffect, useState, type FormEventHandler } from 'react';
import { CalendarDays, Link, Link2, Map, MapPin, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { Application, ApplicationField, ApplicationStatus } from '@/models/applications';
import FormInput from '@/components/ui/FormInput';
import FormInputSelect from '@/components/ui/FormInputSelect';
import type { ApplicationForm, FieldFilter } from '../types/types';
import { createApplication, editApplication } from '../services/applications.service';

type ApplicationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplicationChange: () => void;
  currentApplication?: Application;
};

const statusOptions: Array<{ label: string; value: ApplicationStatus }> = [
  {
    label: 'In progress',
    value: 'in-progress',
  },
  {
    label: 'Interview',
    value: 'interview',
  },
  {
    label: 'Offer',
    value: 'offer',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
];

const fieldOptions: Array<{ label: string; value: ApplicationField }> = [
  {
    label: 'Frontend',
    value: 'frontend',
  },
  {
    label: 'Backend',
    value: 'backend',
  },
  {
    label: 'Full-stack',
    value: 'full-stack',
  },
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'DevOps',
    value: 'devops',
  },
  {
    label: 'Cybersecurity',
    value: 'cybersecurity',
  },
];

const initialForm: ApplicationForm = {
  company: '',
  jobTitle: '',
  field: 'full-stack',
  status: 'in-progress',
  appliedAt: new Date().toISOString().split('T')[0],
  location: 'Paris, France',
  link: '',
  notes: '',
};

export default function ApplicationDialog({
  open,
  onOpenChange,
  onApplicationChange,
  currentApplication,
}: ApplicationDialogProps) {
  const [form, setForm] = useState<ApplicationForm>(initialForm);

  useEffect(() => {
    if (currentApplication) {
      setForm({
        company: currentApplication.company,
        jobTitle: currentApplication.jobTitle,
        field: currentApplication.field as ApplicationField,
        status: currentApplication.status,
        appliedAt: currentApplication.appliedAt,
        location: currentApplication.location,
        link: currentApplication.link,
        notes: currentApplication.notes,
      });
    } else {
      setForm(initialForm);
    }
  }, [currentApplication]);

  const updateField = <K extends keyof ApplicationForm>(field: K, value: ApplicationForm[K]) => {
    console.log('form update');
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      if (currentApplication) await editApplication({ id: currentApplication.id, ...form });
      else await createApplication(form);
      onOpenChange(false);
      onApplicationChange();
      setForm(initialForm);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {currentApplication ? 'Edit application' : 'New application'}
          </DialogTitle>

          <DialogDescription>
            {' '}
            {currentApplication
              ? 'Update your job application.'
              : 'Add a new job application to your tracker.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 ">
          <FormInput
            id="company"
            label="Company"
            placeholder="e.g. Capgemini"
            value={form.company}
            required
            onChange={(e) => updateField('company', e.target.value)}
          />

          <FormInput
            id="jobTitle"
            label="Job title"
            placeholder="e.g. Full-stack Engineer Intern"
            value={form.jobTitle}
            required
            onChange={(e) => updateField('jobTitle', e.target.value)}
          />

          <FormInputSelect<ApplicationField>
            label="Field"
            value={form.field}
            options={fieldOptions}
            placeholder="Select a field"
            required
            onValueChange={(value) => updateField('field', value)}
          />

          <FormInputSelect<ApplicationStatus>
            label="Status"
            value={form.status}
            options={statusOptions}
            placeholder="Select a status"
            required
            onValueChange={(value) => updateField('status', value)}
          />

          <FormInput
            id="location"
            icon={Map}
            label="Location"
            placeholder="e.g. Paris, France"
            value={form.location}
            onChange={(e) => updateField('location', e.target.value)}
          />

          <FormInput
            id="link"
            icon={Link}
            label="Link"
            placeholder="e.g. https://example.com/jobs/123"
            value={form.link}
            required
            onChange={(e) => updateField('link', e.target.value)}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="notes">
                Additional notes <span className="font-normal text-gray-500">(optional)</span>
              </label>

              <span className="text-xs text-gray-500">{form.notes?.length}/500</span>
            </div>

            <textarea
              id="notes"
              value={form.notes}
              maxLength={500}
              rows={4}
              placeholder="Add any notes, such as recruiter name, interview process, etc."
              className="resize-none w-full border rounded-lg p-2"
              onChange={(event) => updateField('notes', event.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
              {currentApplication ? 'Save changes' : 'Add application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

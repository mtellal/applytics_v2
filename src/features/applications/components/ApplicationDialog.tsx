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
import useAuth from '@/features/auth/hooks/useAuth';
import { useTranslation } from 'react-i18next';

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

  const { user } = useAuth();

  const { t } = useTranslation();

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
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      onOpenChange(false);
      if (currentApplication) await editApplication(currentApplication.id, form);
      else await createApplication(form, user?.id);
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
            {currentApplication ? t('ApplicationDialog.edit') : t('ApplicationDialog.new')}
          </DialogTitle>

          <DialogDescription>
            {' '}
            {currentApplication
              ? t('ApplicationDialog.editDescription')
              : t('ApplicationDialog.newDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 ">
          <FormInput
            id="company"
            label={t('ApplicationDialog.fields.company')}
            placeholder="e.g. Capgemini"
            value={form.company}
            required
            onChange={(e) => updateField('company', e.target.value)}
          />

          <FormInput
            id="jobTitle"
            label={t('ApplicationDialog.fields.job')}
            placeholder="e.g. Full-stack Engineer Intern"
            value={form.jobTitle}
            required
            onChange={(e) => updateField('jobTitle', e.target.value)}
          />

          <FormInputSelect<ApplicationField>
            label={t('ApplicationDialog.fields.field')}
            value={form.field}
            options={fieldOptions}
            placeholder="Select a field"
            required
            onValueChange={(value) => updateField('field', value)}
          />

          <FormInputSelect<ApplicationStatus>
            label={t('ApplicationDialog.fields.status')}
            value={form.status}
            options={statusOptions}
            placeholder={t('ApplicationDialog.fields.status')}
            required
            onValueChange={(value) => updateField('status', value)}
          />

          <FormInput
            id="location"
            icon={Map}
            label={t('ApplicationDialog.fields.location')}
            placeholder="e.g. Paris, France"
            value={form.location}
            onChange={(e) => updateField('location', e.target.value)}
          />

          <FormInput
            id="link"
            icon={Link}
            label={t('ApplicationDialog.fields.link')}
            placeholder="e.g. https://example.com/jobs/123"
            value={form.link}
            required
            onChange={(e) => updateField('link', e.target.value)}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="notes">
                {t('ApplicationDialog.fields.notes')}{' '}
                <span className="font-normal text-gray-500">
                  {t('ApplicationDialog.fields.optional')}
                </span>
              </label>

              <span className="text-xs text-gray-500">{form.notes?.length}/500</span>
            </div>

            <textarea
              id="notes"
              value={form.notes}
              maxLength={500}
              rows={4}
              placeholder={t('ApplicationDialog.fields.additionalNotes')}
              className="resize-none w-full border rounded-lg p-2"
              onChange={(event) => updateField('notes', event.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('ApplicationDialog.buttons.cancel')}
            </Button>

            <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
              {currentApplication
                ? t('ApplicationDialog.buttons.edit')
                : t('ApplicationDialog.buttons.new')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

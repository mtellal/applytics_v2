import { BarChart3, FileText, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const features = [
  {
    title: 'landing.features.tracking.title',
    description: 'landing.features.tracking.description',
    icon: FileText,
    iconClassName: 'text-blue-600',
    backgroundClassName: 'bg-blue-50',
  },
  {
    title: 'landing.features.analytics.title',
    description: 'landing.features.analytics.description',
    icon: BarChart3,
    iconClassName: 'text-emerald-500',
    backgroundClassName: 'bg-emerald-50',
  },
  {
    title: 'landing.features.organization.title',
    description: 'landing.features.organization.description',
    icon: Target,
    iconClassName: 'text-violet-500',
    backgroundClassName: 'bg-violet-50',
  },
  {
    title: 'landing.features.time.title',
    description: 'landing.features.time.description',
    icon: Zap,
    iconClassName: 'text-amber-500',
    backgroundClassName: 'bg-amber-50',
  },
];

export default function FeatureHighlights() {
  const { t } = useTranslation();

  return (
    <section id="features" className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article key={feature.title} className="flex items-start gap-5">
            <div
              className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${feature.backgroundClassName}`}
            >
              <Icon className={`size-6 ${feature.iconClassName}`} />
            </div>

            <div>
              <h2 className="font-semibold">{t(feature.title)}</h2>

              <p className="mt-1 max-w-[200px] text-sm leading-6 text-slate-500">
                {t(feature.description)}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

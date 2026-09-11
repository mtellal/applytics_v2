import { BarChart3, FileText, Target, Zap } from 'lucide-react';

const features = [
  {
    title: 'Centralisez',
    description: 'Toutes vos candidatures au même endroit',
    icon: FileText,
    iconClassName: 'text-blue-600',
    backgroundClassName: 'bg-blue-50',
  },
  {
    title: 'Analysez',
    description: 'Visualisez vos progrès en un coup d’œil',
    icon: BarChart3,
    iconClassName: 'text-emerald-500',
    backgroundClassName: 'bg-emerald-50',
  },
  {
    title: 'Restez motivé',
    description: 'Suivez vos objectifs et célébrez vos réussites',
    icon: Target,
    iconClassName: 'text-violet-500',
    backgroundClassName: 'bg-violet-50',
  },
  {
    title: 'Gagnez du temps',
    description: 'Un outil simple et efficace pour aller plus loin',
    icon: Zap,
    iconClassName: 'text-amber-500',
    backgroundClassName: 'bg-amber-50',
  },
];

export default function FeatureHighlights() {
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
              <h2 className="font-semibold">{feature.title}</h2>

              <p className="mt-1 max-w-[200px] text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

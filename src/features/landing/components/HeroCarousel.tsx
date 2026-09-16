import { useEffect, useState } from 'react';

import dashboard from '@/assets/carousel_dashboard.png';
import applications from '@/assets/carousel_applications.png';
import { useTranslation } from 'react-i18next';

const slides = [
  {
    id: 1,
    label: 'landing.carousel.dashboard.label',
    annotation: 'landing.carousel.dashboard.description',
    image: dashboard,
  },
  {
    id: 2,
    label: 'landing.carousel.applications.label',
    annotation: 'landing.carousel.applications.description',
    image: applications,
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[activeSlide];

  return (
    <div className="relative min-w-0">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
        <div className="aspect-[16/9] bg-slate-50">
          <img src={slide.image} alt={t(slide.label)} className="h-full w-full" />
        </div>
      </div>

      <p className="mt-6 text-right text-sm font-medium text-blue-600">{t(slide.annotation)}</p>

      <div className="mt-6 flex justify-center gap-3">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={t(item.label)}
            onClick={() => setActiveSlide(index)}
            className={`size-2.5 cursor-pointer rounded-full transition-all ${
              index === activeSlide ? 'bg-blue-600' : 'bg-slate-200 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

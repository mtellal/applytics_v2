import { useEffect, useState } from 'react';

import dashboard from '@/assets/carousel_dashboard.png';
import applications from '@/assets/carousel_applications.png';

const slides = [
  {
    id: 1,
    label: 'Dashboard',
    annotation: 'Un tableau de bord clair pour suivre vos progrès',
    image: dashboard,
  },
  {
    id: 2,
    label: 'Candidatures',
    annotation: 'Toutes vos candidatures au même endroit',
    image: applications,
  },
  {
    id: 3,
    label: 'Statistiques',
    annotation: 'Visualisez rapidement votre progression',
    image: dashboard,
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

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
          <img src={slide.image} alt={slide.label} className="h-full w-full " />
        </div>
      </div>

      <p className="mt-6 text-right text-sm font-medium text-blue-600">↳ {slide.annotation}</p>

      <div className="mt-6 flex justify-center gap-3">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Afficher ${item.label}`}
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

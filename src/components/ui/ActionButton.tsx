import type { LucideIcon } from 'lucide-react';

type ActionButtonVariant = 'primary' | 'secondary';

type ActionButtonProps = {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: ActionButtonVariant;
  onClick?: () => void;
};

const variantStyles: Record<ActionButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500 border border-blue-600',

  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
};

export default function ActionButton({
  children,
  icon: Icon,
  variant = 'primary',
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2
        rounded-lg px-5 py-3
        text-sm font-medium
        transition-colors
        ${variantStyles[variant]}
      `}
    >
      {Icon && <Icon className="h-5 w-5" />}

      {children}
    </button>
  );
}

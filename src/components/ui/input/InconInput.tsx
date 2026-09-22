import { useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type IconInputProps = {
  value: string;
  placeholder: string;
  label: string;
  icon: LucideIcon;

  type?: 'text' | 'email' | 'password';
  id?: string;
  iconSize?: number;
  inputClassName?: string;
  iconClassName?: string;
  required?: boolean;
  autoComplete?: string;

  error?: string;

  onChange: (value: string) => void;
};

export default function IconInput({
  value,
  placeholder,
  label,
  icon: Icon,
  type = 'text',
  id = 'icon-input',
  iconSize = 18,
  inputClassName,
  iconClassName,
  required = true,
  autoComplete,
  error,
  onChange,
}: IconInputProps) {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  const inputType = isPassword && showPassword ? 'text' : type;

  const defaultIconClassName = 'absolute top-1/2 left-3 -translate-y-1/2 text-slate-400';

  const defaultInputClassName = `
    h-11 w-full rounded-lg border pl-10 text-sm
    outline-none transition placeholder:text-slate-400
    ${isPassword ? 'pr-10' : 'pr-4'}
    ${
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/10'
        : 'border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10'
    }
  `;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-800">
        {t(label)}
      </label>

      <div className="relative">
        <Icon size={iconSize} className={iconClassName ?? defaultIconClassName} />

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t(placeholder)}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClassName ?? defaultInputClassName}
          maxLength={150}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-600"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

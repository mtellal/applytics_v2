import { CircleCheck } from 'lucide-react';

export function SignUpSuccess({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-8 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-green-100">
        <CircleCheck className="size-7 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-slate-950">Vérifiez votre boîte mail</h2>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Votre compte a bien été créé. Nous avons envoyé un lien de confirmation à
      </p>

      <p className="mt-1 font-medium text-slate-800">{email}</p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Cliquez sur le lien reçu par e-mail pour confirmer votre compte et commencer à utiliser
        Applytics.
      </p>
    </div>
  );
}

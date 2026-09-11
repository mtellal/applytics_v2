export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full rounded-lg border px-4 py-3 font-medium hover:bg-gray-50"
    >
      Continue with Google
    </button>
  );
}

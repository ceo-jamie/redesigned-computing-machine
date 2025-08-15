// app/login/page.tsx
import { login } from './actions';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; from?: string };
}) {
  const from = searchParams?.from ?? '/b2b';
  const showError = searchParams?.error === '1';

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        action={login}
        className="w-full max-w-sm space-y-4 border rounded-2xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-semibold">Retailer login</h1>

        {showError && (
          <p className="text-red-600 text-sm">Wrong password. Try again.</p>
        )}

        <input type="hidden" name="from" value={from} />

        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border rounded-lg p-2"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
        >
          Enter
        </button>
      </form>
    </main>
  );
}

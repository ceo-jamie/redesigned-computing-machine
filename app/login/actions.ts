'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const from = String(formData.get('from') ?? '/b2b');

  if (password === process.env.B2B_PASSWORD) {
    cookies().set('b2b_auth', '1', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });
    redirect(from);
  }

  redirect(`/login?error=1&from=${encodeURIComponent(from)}`);
}

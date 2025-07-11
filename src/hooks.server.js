import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
  if (event.url.pathname === '/') {
    redirect(307, '/works/union');
  }
  return resolve(event);
}
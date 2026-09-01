export async function generatePrompt(payload) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => body.set(key, value ?? ''));

  let res;
  try {
    res = await fetch('/generate-prompt', { method: 'POST', body });
  } catch {
    throw new Error('Could not reach the Generation Service. Is the backend running?');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* fall through */
  }

  if (!data) {
    throw new Error('The Generation Service returned an unreadable response.');
  }
  if (data.error) {
    throw new Error(data.error);
  }
  if (!data.prompt) {
    throw new Error('The Generation Service returned an empty prompt.');
  }
  return data.prompt;
}
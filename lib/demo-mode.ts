export const isDemoMode = () =>
  process.env.ALLOW_LIVE_DB !== 'true' || !process.env.MONGODB_URL;

/** Reject non-string / oversized payloads before they touch Mongo. */
export function sanitizePlainText(input: unknown, max = 2000): string {
  if (typeof input !== 'string') {
    throw new Error('Invalid text payload');
  }
  const trimmed = input.trim();
  if (!trimmed) throw new Error('Text is required');
  if (trimmed.length > max) throw new Error('Text is too long');
  // Strip null bytes / control chars that can confuse drivers or logs
  return trimmed.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

export function assertSafeId(id: unknown): string {
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{1,128}$/.test(id)) {
    throw new Error('Invalid id');
  }
  return id;
}

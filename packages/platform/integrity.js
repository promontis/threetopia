export async function sha256(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', typeof bytes === 'string' ? new TextEncoder().encode(bytes) : bytes);
  return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
}

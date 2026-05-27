export function dateFromFeedId(id: string): Date {
  const match = id.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) throw new Error(`Feed entry id '${id}' does not start with YYYY-MM-DD`);
  return new Date(match[1] + 'T00:00:00');
}

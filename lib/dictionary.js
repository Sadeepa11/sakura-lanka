export async function getDictionary(locale) {
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return messages || {};
  } catch {
    const messages = (await import(`../messages/en.json`)).default;
    return messages || {};
  }
}
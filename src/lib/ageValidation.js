const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseIsoDate(value) {
  const match = ISO_DATE_PATTERN.exec(String(value ?? ''));
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

export function getTodayInBudapest(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Budapest',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function isAtLeast18On(birthDate, referenceDate = getTodayInBudapest()) {
  const birth = parseIsoDate(birthDate);
  const reference = parseIsoDate(referenceDate);
  if (!birth || !reference) return false;

  const eighteenthBirthdayYear = birth.year + 18;
  if (eighteenthBirthdayYear !== reference.year) {
    return eighteenthBirthdayYear < reference.year;
  }

  if (birth.month !== reference.month) {
    return birth.month < reference.month;
  }

  return birth.day <= reference.day;
}

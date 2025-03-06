/**
 * Format a date into a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} - The formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
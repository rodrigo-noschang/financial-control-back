import { AppError } from "../errors";
/**
 * @param {string} dateString 
 * Dates must be formatted as yyyy/MM/dd or yyyy-MM-dd
 * @returns {Date} 
 */
export function validateDateUtil(dateString: string): Date {
  const date = new Date(dateString);
  let year, month, day;

  const currentYear = new Date().getFullYear();

  if (!date.getDate()) {
    throw new AppError('Formato de data inválido');
  }

  if (dateString.includes('/')) {
    [year, month, day] = dateString.split('/').map(dateInfo => parseInt(dateInfo));
  } else if (dateString.includes('-')) {
    [year, month, day] = dateString.split('-').map(dateInfo => parseInt(dateInfo));
  }

  const validYear = year && year >= 2023 && year <= currentYear;
  const validMonth = month && month >= 1 && month <= 12;
  const validDay = day && day >= 1 && day <= 31;

  if (!validYear || !validMonth || !validDay) {
    throw new AppError('Formato de data inválido');
  }

  return date;
}
import { format } from 'date-fns';

export function formatBrDate(date: Date): String {
  const dateInBrFormat = format(date, 'dd/MM/yyyy');

  return dateInBrFormat;
}
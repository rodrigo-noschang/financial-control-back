import { AppError } from "../errors";

export default function (dateString: string): Date {
  const date = new Date(dateString);

  if (!date.getDate()) {
    throw new AppError('Formato de data inválido');
  }

  return date;
}
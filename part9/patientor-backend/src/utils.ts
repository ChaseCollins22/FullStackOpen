export const isString = (name: unknown): name is string => {
  return typeof name === 'string' || name instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isSSN = (ssn: string): boolean => {
  const ssnFormat = /^\d{3}-\d{2}-\d{4}$/;
  return !ssnFormat.test(ssn) || !isString(ssn);
};

export const isBirthday = (birthday: string): boolean => {
  const birthdayFormat = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return !birthdayFormat.test(birthday) || !isString(birthday);
};

export const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

export const parseSSN = (ssn: string): string => {
  if (!isSSN(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }

  return ssn;
};

export const parseBirthday = (birthday: string): string => {
  if (!isBirthday(birthday)) {
    throw new Error(`Incorrect or missing birthday ${birthday}`);
  }

  return birthday;
};
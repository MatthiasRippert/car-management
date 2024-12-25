export function isNullOrEmpty(value: string) {
  return value === null || value === undefined || value === '';
}

export function isSet(value: any) {
  return value !== null && value !== undefined;
}

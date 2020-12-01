export const camelCaseToNormal = (camelCase: string): string => {
  return camelCase.replace(/^[a-z]|[A-Z]/g, (charValue, index) => {
    return index === 0 ? charValue.toUpperCase() : ` ${charValue.toLowerCase()}`;
  });
};

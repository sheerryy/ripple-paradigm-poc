export const snakeCaseToNormal = (snakeCase: string): string => {
  const result: string = snakeCase.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

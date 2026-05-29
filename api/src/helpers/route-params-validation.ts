export const acceptedParams = (allowedKeys: string[], body: any) => {
  const bodyKeys = Object.keys(body);
  if(bodyKeys.every(key => allowedKeys.includes(key))) {
    return body;
  } else {
    throw new Error("Invalid parameters");
  }
}
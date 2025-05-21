import { UserType } from "./types/types";

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
};

export const volume = {
  0: {
    volume: 0,
    active: false,
  },
  1: {
    volume: 0.5,
    active: false,
  },
  2: {
    volume: 1,
    active: true,
  },
} as const;

export const ParseThis = (data: any) => {
  return JSON.parse(JSON.parse(JSON.stringify(data)));
};

export function generateCacheForUserResponse(response: any) {
  try {
    let parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;

    let data = parsedResponse.data;

    const storedData = JSON.stringify(data);
    localStorage.setItem('responseData', storedData); 

    return storedData;
  } catch (error) {
    return null;
  }
}


export function getCachedUser() {
  try {
    const storedData = localStorage.getItem('responseData');

    if (!storedData) {
      return null;
    }

    const parsedData = JSON.parse(storedData);
    return parsedData as UserType;
  } catch (error) {
    return null;
  }
}
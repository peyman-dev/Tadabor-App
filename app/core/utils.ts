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
} as const

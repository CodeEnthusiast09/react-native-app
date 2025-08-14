import { Pagination } from "@/interfaces/global";
import { deleteFromStorage } from "./asyncStorage";

export const convertCamelKeysToSnakeCase = (
  value: any,
  option = { convertString: false }
): any => {
  if (Array.isArray(value)) {
    return value?.map((item) => convertCamelKeysToSnakeCase(item));
  } else if (typeof value === "object" && value !== null) {
    return Object?.keys(value)?.reduce((acc, key) => {
      const snakeKey = key?.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      // @ts-ignore
      acc[snakeKey] = convertCamelKeysToSnakeCase(value[key]);
      return acc;
    }, {});
  } else if (typeof value === "string" && option?.convertString) {
    const snakeKey = value?.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
    return snakeKey;
  } else {
    return value;
  }
};

export const convertSnakeCaseKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeCaseKeysToCamelCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_./g, (match) =>
        match.charAt(1).toUpperCase()
      );

      // @ts-ignore
      acc[camelKey] = convertSnakeCaseKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
};

export const clearAuthenticationCredentials = () => {
  deleteFromStorage("token");
  deleteFromStorage("user-id");
  deleteFromStorage("email");
};

export const extractPaginationFromGetResponse = (
  resolvedData: Pagination
): Pagination | null => {
  if (!resolvedData?.currentPage) {
    return null;
  }

  const pagination: Pagination = {
    currentPage: resolvedData?.currentPage,
    hasMorePages: resolvedData?.hasMorePages,
    lastPage: resolvedData?.lastPage,
    perPage: resolvedData?.perPage,
    total: resolvedData?.total,
  };

  return pagination;
};

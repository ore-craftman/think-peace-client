const baseUrl = process.env.REACT_APP_ENDPOINT;

export const endpoints = {
  wish: {
    GET_ALL: `${baseUrl}/wishes`,
    CREATE: `${baseUrl}/add-wish`,
  },
};

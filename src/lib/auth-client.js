import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  fetchOptions: {
    credentials: "include",
  },

  plugins: [
     jwtClient(),

    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }),
  ],
});

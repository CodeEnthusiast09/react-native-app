import { authClientRequests } from "./auth-api";
import { habitClientRequests } from "./habit-api";

export const clientRequest = {
  auth: authClientRequests,
  habit: habitClientRequests,
};

import { habitValidationSchema } from "@/validations/habit";
import { InferType } from "yup";
import { clientRequestGateway } from "./request-gateway";

const requestGateway = clientRequestGateway();

export const habitClientRequests = {
  getAll: () => requestGateway.get(`/habits`),

  getOne: (id: string) => requestGateway.get(`/habit/${id}`),

  create: (payload: InferType<typeof habitValidationSchema>) =>
    requestGateway.post({
      url: `/habits`,
      payload,
    }),

  complete: (id: string) =>
    requestGateway.post({
      url: `/habits/${id}/completions`,
    }),

  getCompleted: () => requestGateway.get(`/habits/completed`),

  getCompletedToday: () => requestGateway.get(`/habits/completed/today`),

  update: (payload: InferType<typeof habitValidationSchema>) =>
    requestGateway.patch({
      url: `/habits`,
      payload,
    }),

  delete: (id: string) => requestGateway.delete({ url: `/habits/${id}` }),
};

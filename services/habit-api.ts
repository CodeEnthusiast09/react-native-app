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

  update: (payload: InferType<typeof habitValidationSchema>) =>
    requestGateway.patch({
      url: `/habits`,
      payload,
    }),

  delete: (id: string) => requestGateway.get(`/habit/${id}`),
};

import apiClient from "./api-client";

interface Entity {
  _id: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getItem<T>(id: string) {
    const controller = new AbortController();
    const request = apiClient.get<T>(`${this.endpoint}/${id}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.put(`${this.endpoint}/${entity._id}`, entity);
  }

  delete(id: string) {
    return apiClient.delete(`${this.endpoint}/${id}`);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;

import axios from "axios";

export const api = axios.create({
  baseURL: "https://letsoar-backend.onrender.com",
  timeout: 80000,
});

export interface registerType {
  name: string;
  email: string;
  programme: "workshop" | "coaching";
  workshopID?: string;
  workshopDate?: string;
  userMessage?: string;
}

export async function getBlogs() {
  return api
    .get("/blogs/")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.data);
      return error;
    });
}

export async function getCourses() {
  return api
    .get("/course/")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => error.data);
}

export async function getWorkshops() {
  return api
    .get("/course/workshops")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => error.data);
}

export async function getBlog(blogId: string) {
  const response = await api
    .get(`/blogs/${blogId}`)
    .then((response) => {
      console.log(response.data.blog);
      return response.data.blog;
    })
    .catch((error) => {
      console.log(error.data);
      return error.data;
    });
  return response;
}

export async function register(data: registerType) {
  return api
    .post("/user", data)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function getPrice() {
  return api
    .get("/user/price")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function handlePayment(data: { email: string; amount: string }) {
  return api
    .post("/payment", data)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}

export async function verifyPayment(ref: string) {
  return api
    .post("/payment/verify", { reference: ref })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}

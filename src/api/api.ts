import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 80000,
});

export async function getBlogs() {
  return api
    .get("/blogs/")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => error.data);
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

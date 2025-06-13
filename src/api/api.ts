import axios from "axios";

export const api = axios.create({
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

export async function register(data: {
  name: string;
  email: string;
  programme: "workshop" | "coaching";
  workshopID?: string;
  userMessage?: string;
}) {
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

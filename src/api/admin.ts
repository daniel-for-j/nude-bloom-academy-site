import { api } from "./api";

export async function login(data: { username: string; password: string }) {
  api
    .post("/auth/", data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function addBlog(data: {
  title: string;
  body: string;
  category: string;
  thumbnail: File;
}) {
  const token = localStorage.getItem("token");
  api
    .post("/admin/addblog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

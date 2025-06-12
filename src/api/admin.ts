import { api } from "./api";

export async function login(data: { username: string; password: string }) {
  return api
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
  thumbnail: File | null;
}) {
  const token = localStorage.getItem("token");
  return api
    .post("/admin/blog", data, {
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

export async function addCourse(data: {
  title: string;
  description: string;
  price: string;
  link: string;
  thumbnail: File | null;
}) {
  const token = localStorage.getItem("token");
  return api
    .post("/admin/course", data, {
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

export async function addWorkshop(data: {
  name: string;
  details: string;
  price: string;
  date: string;
  maxNumber: number;
  thumbnail: File | null;
}) {
  const token = localStorage.getItem("token");
  return api
    .post("/admin/workshop", data, {
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
export async function editCourse(
  data: {
    title?: string;
    description?: string;
    price?: string;
    link?: string;
    thumbnail?: File | null;
  },
  id: string
) {
  const token = localStorage.getItem("token");
  try {
    const response = await api.put(`/admin/course/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw so the mutation can catch it
  }
}
export async function editBlog(
  data: {
    title?: string;
    body?: string;
    category?: string;
    thumbnail?: File | null;
  },
  id: string
) {
  const token = localStorage.getItem("token");
  return api
    .put(`/admin/blog/${id}`, data, {
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

export async function deleteBlog(id: string) {
  const token = localStorage.getItem("token");
  return api
    .delete(`/admin/blog/${id}`, {
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

export async function deleteCourse(id: string) {
  const token = localStorage.getItem("token");
  return api
    .delete(`/admin/course/${id}`, {
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

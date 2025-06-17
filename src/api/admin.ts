import { api } from "./api";

export async function login(data: { username: string; password: string }) {
  return api
    .post("/auth/", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.data;
    });
}

export async function addBlog(data: {
  title: string;
  body: string;
  category: string;
  thumbnail: File | null;
}) {
  const token = sessionStorage.getItem("token");
  return api
    .post("/admin/blog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}

export async function addCourse(data: {
  title: string;
  description: string;
  price: string;
  link: string;
  thumbnail: File | null;
}) {
  const token = sessionStorage.getItem("token");
  return api
    .post("/admin/course", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}

export async function addWorkshop(data: {
  name: string;
  details: string;
  price: string;
  date: string;
  maxNumber: number;
  thumbnail: File | null;
}) {
  const token = sessionStorage.getItem("token");
  return api
    .post("/admin/workshop", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
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
  const token = sessionStorage.getItem("token");
  try {
    const response = await api.put(`/admin/course/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
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
  const token = sessionStorage.getItem("token");
  return api
    .put(`/admin/blog/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}
export async function editWorkshop(
  data: {
    name?: string;
    details?: string;
    price?: string;
    date?: string;
    maxNumber?: number;
    thumbnail?: File | null;
  },
  id: string
) {
  const token = sessionStorage.getItem("token");
  return api
    .put(`/admin/workshop/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}

export async function deleteBlog(id: string) {
  const token = sessionStorage.getItem("token");
  return api
    .delete(`/admin/blog/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}

export async function deleteCourse(id: string) {
  const token = sessionStorage.getItem("token");
  return api
    .delete(`/admin/course/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
}

export async function sendNewsLetter(data: { subject: string; text: string }) {
  const token = sessionStorage.getItem("token");
  return api
    .post("/admin/newsletter", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function getUsers() {
  return api
    .get("/user")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export async function editPrice(data: { price: number }) {
  const token = sessionStorage.getItem("token");
  return api
    .put(`/admin/price/684c394133c6f5a438b54af0`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function editTestimonial(
  data: { isVisible: boolean },
  id: string
) {
  const token = sessionStorage.getItem("token");
  return api
    .put(`/admin/testimonial/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.data;
    });
}

export async function getTestimonies() {
  const token = sessionStorage.getItem("token");
  return api
    .get("/admin/testimonial", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export interface Blog {
  _id?: string;
  title: string;
  body: string;
  category: string;
  thumbnail?: File;
  thumbnailUrl?: string;
}

export interface Workshop {
  _id: string;
  name: string;
  details: string;
  date: string;
  price: string;
  maxNumber: number;
  thumbnail?: File;
  thumbnailUrl?: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: File;
  thumbnailUrl: string;
  price: string;
  link: string;
}

export interface Newsletter {
  id: string;
  subject: string;
  text: string;
  createdAt: string;
  sentAt?: string;
  status: "draft" | "sent";
}

export interface testimonialType {
  _id: string;
  name: string;
  email: string;
  body: string;
  programme: string;
  thumbnailUrl: string;
  isVisible: boolean;
}

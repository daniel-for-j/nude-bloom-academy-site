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
  thumbnail?: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
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

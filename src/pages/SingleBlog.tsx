import { Img } from "react-image";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "@/api/api";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useQuery({
    queryFn: () => getBlog(id),
    queryKey: ["blog", id],
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-gray-700">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{post.title}</span>
          </div>

          {/* Post Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-medium mb-4">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{post.createdAt.split("T")[0]}</span>
              </div>

              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-10 rounded-lg overflow-hidden">
            <Img
              src={(post.thumbnail && post.thumbnail) || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Post Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      )}
    </div>
  );
}

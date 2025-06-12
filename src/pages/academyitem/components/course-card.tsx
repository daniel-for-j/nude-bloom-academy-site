import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CourseProps {
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string;
  link: string;
}

export default function CourseCard({ course }: { course: CourseProps }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={course.thumbnailUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-48 w-full object-cover"
        />
        <Badge className="absolute right-2 top-2 bg-white/90 text-black">
          ₦{course.price}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h4 className="line-clamp-1 text-lg font-medium">{course.title}</h4>
        <p className="line-clamp-2 mt-2 text-sm text-muted-foreground">
          {course.description}
        </p>
      </CardContent>

      <CardFooter className="border-t bg-muted/30 p-4 pt-3">
        <Button asChild variant="default" className="w-full">
          <a href={course.link} target="_blank" rel="noopener noreferrer">
            View on Udemy
            <ArrowRight size={16} className="ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

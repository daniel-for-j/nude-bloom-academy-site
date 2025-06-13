import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WorkshopProps {
  name: string;
  date: string;
  price: string;
  thumbnailUrl: string;
  maxNumber: number;
  participants: string[];
}

export default function WorkshopCard({
  workshop,
  onRegister,
}: {
  workshop: WorkshopProps;
  onRegister: () => void;
}) {
  const newDate = new Date();
  return (
    <Card className="group relative overflow-hidden h-64 transition-all duration-300 hover:shadow-lg">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={workshop.thumbnailUrl || "/placeholder.svg?height=400&width=600"}
          alt={workshop.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
        <div>
          <h4 className="text-xl font-medium leading-tight text-white">
            {workshop.name}
          </h4>

          <div className="mt-3 flex items-center text-white/80">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{workshop.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-medium">₦{workshop.price}</div>
          <Button
            onClick={onRegister}
            disabled={workshop.maxNumber < workshop.participants.length}
            className="bg-white text-black hover:bg-white/90"
          >
            {workshop.maxNumber > workshop.participants.length
              ? "Register"
              : "Full"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

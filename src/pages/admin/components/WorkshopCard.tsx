import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Edit } from "lucide-react";

interface Workshop {
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

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard = ({ workshop }: WorkshopCardProps) => {
  return (
    <Card key={workshop._id} className="hover-lift">
      <CardHeader>
        {workshop.thumbnailUrl && (
          <img
            src={workshop.thumbnailUrl}
            alt={workshop.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        )}
        <CardTitle className="line-clamp-2">{workshop.name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{new Date(workshop.date).toLocaleDateString()}</span>
          <span className="font-semibold text-primary">₦{workshop.price}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {workshop.details}
        </p>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Users className="h-4 w-4" />
            <span className="font-medium">
              Participants ({workshop.participants.length}/{workshop.maxNumber})
            </span>
          </div>

          {workshop.participants.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {workshop.participants.map((participant, index) => (
                <div key={index} className="bg-muted/50 rounded-md p-2 text-xs">
                  <div className="font-medium text-foreground">
                    {participant}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground italic">
              No participants registered yet
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {/* <Button size="sm" variant="outline" onClick={() => onEdit(workshop)}>
            <Edit className="h-4 w-4" />
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopCard;

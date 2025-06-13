import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Calendar,
  DollarSign,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import { editPrice, getUsers } from "@/api/admin";
import { getPrice } from "@/api/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const UsersManager = () => {
  const { toast } = useToast();
  const { data, status } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
  const {
    data: originalPrice,
    status: getPriceStatus,
    refetch: priceRefetch,
  } = useQuery({
    queryFn: getPrice,
    queryKey: ["price"],
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (originalPrice) {
      setCoachingPrice(originalPrice.price);
    }
  }, [originalPrice]);
  const { mutate, status: priceMutateStatus } = useMutation({
    mutationFn: editPrice,
    onSuccess: () => {
      priceRefetch();
      toast({ title: "Price updated" });
    },
    onError: (err) =>
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: err.message,
      }),
  });

  const [coachingPrice, setCoachingPrice] = useState("");

  const handlePriceUpdate = () => {
    mutate({ price: Number(coachingPrice) });
  };

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Users Management
          </h1>
          <p className="text-muted-foreground">
            View registered users for one-on-one coaching
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            One-on-One Coaching Price
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 max-w-md">
            <div className="flex-1">
              <Label htmlFor="coaching-price">Coaching Price</Label>
              <Input
                id="coaching-price"
                type="number"
                value={
                  getPriceStatus === "pending"
                    ? "loading price..."
                    : coachingPrice
                }
                onChange={(e) => setCoachingPrice(e.target.value)}
                placeholder="150"
              />
            </div>
            <Button
              onClick={handlePriceUpdate}
              disabled={priceMutateStatus === "pending"}
            >
              Update Price
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            Registered Users ({data.Users.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.Users &&
            data.Users.map((user) => (
              <Card
                key={user._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {user.programme}
                    </span>
                  </div>

                  {user.createdAt && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {user.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {user.userMessage && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">
                          Message:
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground italic pl-6">
                        "{user.userMessage}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

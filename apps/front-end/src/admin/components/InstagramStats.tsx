import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Instagram, Heart, MessageCircle, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Followers",
    value: "45.2K",
    change: "+1.2K this week",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    label: "Engagement Rate",
    value: "4.8%",
    change: "+0.5% from last week",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400"
  },
  {
    label: "Total Likes",
    value: "12.5K",
    change: "+2.3K this week",
    icon: Heart,
    color: "text-red-600 dark:text-red-400"
  },
  {
    label: "Comments",
    value: "892",
    change: "+145 this week",
    icon: MessageCircle,
    color: "text-blue-600 dark:text-blue-400"
  }
];

export function InstagramStats() {
  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle>Instagram Analytics</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline">@taanttantra</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-foreground">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
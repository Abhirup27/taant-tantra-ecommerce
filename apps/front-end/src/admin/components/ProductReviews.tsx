import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

const initialReviews: Review[] = [
  {
    id: '1',
    customer: 'Priya Sharma',
    product: 'Banarasi Silk Saree',
    rating: 5,
    comment: 'Absolutely beautiful saree! The quality is exceptional and the colors are vibrant. Worth every penny.',
    date: '2 hours ago'
  },
  {
    id: '2',
    customer: 'Anjali Patel',
    product: 'Cotton Tant Saree',
    rating: 4,
    comment: 'Great quality cotton saree. Very comfortable to wear. Delivery was quick too!',
    date: '5 hours ago',
    reply: 'Thank you for your wonderful feedback! We are glad you loved our saree.'
  },
  {
    id: '3',
    customer: 'Meera Reddy',
    product: 'Kanjivaram Silk Saree',
    rating: 5,
    comment: 'Traditional and elegant! The silk quality is top-notch. Highly recommend for special occasions.',
    date: '1 day ago'
  },
  {
    id: '4',
    customer: 'Kavita Singh',
    product: 'Georgette Printed Saree',
    rating: 4,
    comment: 'Beautiful print and lightweight fabric. Perfect for daily wear.',
    date: '1 day ago'
  },
  {
    id: '5',
    customer: 'Ritu Desai',
    product: 'Chiffon Embroidered Saree',
    rating: 5,
    comment: 'Stunning embroidery work! Received so many compliments. Will definitely order again.',
    date: '2 days ago'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

export function ProductReviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (selectedReview && replyText.trim()) {
      setReviewsList(reviewsList.map(review => 
        review.id === selectedReview.id 
          ? { ...review, reply: replyText }
          : review
      ));
      setReplyText('');
      setSelectedReview(null);
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Latest Product Reviews</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-lg border border-border bg-muted/30 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.customer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground">{review.customer}</p>
                    <p className="text-muted-foreground">{review.product}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <StarRating rating={review.rating} />
                  <p className="text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <p className="text-foreground">{review.comment}</p>
              
              {review.reply && (
                <div className="mt-3 pl-4 border-l-2 border-primary bg-primary/5 p-3 rounded">
                  <p className="text-primary mb-1">Admin Reply:</p>
                  <p className="text-foreground">{review.reply}</p>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  setSelectedReview(review);
                  setReplyText(review.reply || '');
                }}
              >
                <MessageSquare className="w-4 h-4" />
                {review.reply ? 'Edit Reply' : 'Reply'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Reply Dialog */}
      <Dialog open={selectedReview !== null} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              {/* Review Preview */}
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-muted-foreground">Review by {selectedReview.customer}</p>
                <p className="text-foreground mt-1">{selectedReview.comment}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply here..."
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReview(null);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {selectedReview.reply ? 'Update Reply' : 'Post Reply'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

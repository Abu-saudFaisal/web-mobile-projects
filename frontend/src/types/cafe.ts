export type Cafe = {
  _id: string;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  addedBy: string;
  averageRating: number;
  ratingsCount: number;
};

export type CafeRating = {
  _id: string;
  cafeId: string;
  userId: string;
  rating: number;
  comment?: string;
};
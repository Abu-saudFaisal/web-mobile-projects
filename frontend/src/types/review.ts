export type ReviewCategory = "Machines" | "Tools" | "Beans" | "V60 Recipes";

export interface Review {
  id: string;
  itemName: string;
  category: ReviewCategory;
  imageUrl?: string;
  rating: number;
  summary: string;
  reviewer: string;
  likes: number;
  isSaved?: boolean;
}

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  location: string;
  ticketLink: string;
  isSoldOut?: boolean;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  poster?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

import { TourDate } from '../types';

const ARTIST_ID = "id_13222791";
const APP_ID = "d7eed783d489d156a8b1930c18523820";

export const fetchLiveTourDates = async (): Promise<TourDate[]> => {
  try {
    const response = await fetch(`https://rest.bandsintown.com/artists/${ARTIST_ID}/events?app_id=${APP_ID}`);
    if (!response.ok) throw new Error('Failed to fetch tour dates');
    
    const data = await response.json();
    
    return data.map((event: any) => ({
      id: event.id,
      date: new Date(event.datetime).toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase(),
      venue: event.venue.name,
      location: `${event.venue.city}, ${event.venue.region}`,
      ticketLink: event.url,
      isSoldOut: event.status === 'sold out'
    }));
  } catch (error) {
    console.error("Bandsintown API Error:", error);
    return [];
  }
};

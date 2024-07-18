
export type HotelType = {
    userId:string;
    _id : string;
    
    name:string;
    city:string;
    country:string;
    description:string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number ;
    starRating :number;
    imageUrls: string[];
    lastUpdated: Date;
};
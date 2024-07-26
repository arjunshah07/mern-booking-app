import React , { useContext ,useState } from "react";


type SearchContext = {
    destination : string;
    chekIn:Date;
    checkOut:Date;
    adultCount:number;
    childCount:number;
    hotelId:string;

    saveSearchValues:(
        destination : string,
        chekIn:Date,
        checkOut:Date,
        adultCount:number,
        childCount:number,
        hotelId:string) => void;
};

const SearchContext= React.createContext<SearchContext | undefined>(undefined);

type SearchContextProvider = {
    children : React.ReactNode;
}
export const SearchContextProvider = ({children}) => {
    const [destination , setDestination] = useState<string>("")
    const [ checkIn , setCheckIn] = useState<Date>(new Date());
    const [ checkOut , setCheckOut] = useState<Date>(new Date());
    const [adultCount , setadultCount] = useState<number>(1);
    const [childCount , setchildCount] = useState<number>(0);
    const [hotelId , setHotelId] = useState<string>("");
    const saveSearchValues = (
        destination : string,
        checkIn:Date,
        checkOut:Date,
        adultCount:number,
        childCount:number,
        hotelId?:string
        ) =>{
            setDestination(destination);
            setCheckIn(checkIn);
            setCheckOut(checkOut);
            setadultCount(adultCount);
            setchildCount(childCount);
            if(hotelId){
                setHotelId(hotelId);
            }
    };
    
    return(
        <SearchContext.Provider 
        value={{
            destination , 
            checkIn , 
            checkOut , 
            adultCount , 
            childCount , 
            hotelId,
            saveSearchValues,
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
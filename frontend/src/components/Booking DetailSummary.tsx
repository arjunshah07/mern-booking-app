import { HotelType } from "../../../backend/src/shared/types"

type Props = {
    checkIn: Date;
    checkOut : Date;
    adultCount : number;
    childCount : number;
    numberOfNights : number;
    hotel : HotelType;

};

const BookingDetailSummary= ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
}:Props) => {

    return (
    <div className="grid gap-4 rounded-lg border-slate-300 p-5 h-fit">
        <h2 className="text-xl font-bold">Your Booking Details</h2>
        <div className="border-b pu-2">
            Location:
            <div className="font-bold">{`${hotel.name} , ${hotel.city} , ${hotel.country}`}</div>
        </div>
        <div className="flex justify-between">
            <div className="">
                Check-In
                <div className="font-bold">{checkIn.toDateString()}</div>
            </div>
            <div className="">
                Check-Out
                <div className="font-bold">{checkOut.toDateString()}</div>
            </div>
        </div>
        <div className="border-t border-b py-2">
            Total length of Stay:
            <div className="font-bold">{numberOfNights} nights</div>
        </div>

        <div>
            Guests{" "} <div className="font-bold">
                {adultCount} adults & {childCount} children
            </div>
        </div>
    </div>
    )};


export default BookingDetailSummary;
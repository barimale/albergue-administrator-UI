import { ReservationForm } from '../organisms/ReservationForm';

export type ReservationDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    checkIn: string;
    checkOut: string;
    documentType: string;
    passport: string;
    sex: string;
    age: string;
    nationality: string;
    documentCountryExpeditor: string;
    residenceCountry: string;
}

export default function ReservationPageContent(){
    return (
        <ReservationForm />
    );
}

const ExternalReservation = () =>{
    return (
        <div dangerouslySetInnerHTML={{ __html: "<iframe src='http://albergue.hectormarti.com/reservation' height='100%' width='100%' style='border:none;' referrerpolicy='no-referrer' />"}} style={{
            width: '100%',
            height: '100%',
            border: 'none'
    }}/>
    );
}
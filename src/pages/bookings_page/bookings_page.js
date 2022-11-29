import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { bookings as bookingCollection } from "../../database/collections";
import { db } from "../../firebase/firebase_init";
import ReactTimeAgo from 'react-time-ago'
import { NavLink } from "react-router-dom";

export default function BookingsPage() {


    const [userProfile, setProfile] = useState(JSON.parse(localStorage.getItem("loginInfo")));
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem("loginInfo")));
    }, [localStorage.getItem("loginInfo")])


    async function fetchBookings() {
        let email = userProfile.email;
        await getDocs(collection(db, bookingCollection))
            .then((querySnapshot) => {
                let newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                newData = newData.filter((data) => data.bookedBy == email)
                console.log(newData)
                setBookings(newData);
            });
    };

    useEffect(() => { fetchBookings() }, [userProfile]);
    useEffect(() => { fetchBookings() }, []);


    function payNow(data, id) {
        console.log({ ...data, paid: true })
        setDoc(doc(db, bookingCollection, data.id), { ...data, paid: true }).then(() => {
            fetchBookings();
        })
    }

    if (userProfile == null) {
        return <Container className="text-center my-5">
            Please login first
        </Container>
    }

    return (
        <Container className="my-3">
            {
                bookings.length == 0 ? <center>No bookings yet</center> :
                    bookings.map((book) => <div className="bookingcontainer">
                        {/* {book.bookedAt.toDate().toString()} */}
                        <div className="bookedBy">
                            Booked by: {book.bookedBy}
                        </div>
                        <div style={{ height: 20 }}></div>
                        <div className="bookedticketId my-1">
                            Ticket id: {book.id}
                        </div>
                        <div className="bookedparkingId">
                            Parking place: <NavLink to={"/place?id=" + book.parkingId}>
                                {book.parkingId}
                            </NavLink>
                        </div>
                        <div style={{ height: 20 }}></div>
                        <div className="bookedparkingId">
                            Parking status: {book.closed ? <span className="bookingclosed">Closed</span> : <span className="bookingoccupied">Occupied</span>}
                        </div>
                        <div className="bookingparkingstatus">
                            Amount: <span className="text-primary">{book.price}</span>
                        </div>
                        <div style={{ height: 20 }}></div>
                        <div className="bookingparkingstatus">
                            Payment status: {book.paid ? <span className="bookingparkingstatuspaid"> Paid</span> : <><span className="bookingparkingstatusdue">Due</span><br />
                                <span className="btn btn-success btn-sm my-1" onClick={() => { payNow(book, book.id) }}>
                                    Pay now
                                </span>
                            </>}
                        </div>
                    </div>)
            }
        </Container>
    )

}
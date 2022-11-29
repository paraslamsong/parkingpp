import { Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase_init";
import { bookings, parkingLocation, parkingPrices } from "../../database/collections";
import { MapBox } from "../../components/mapbox";
import { v4 as uuidv4 } from 'uuid';

export default function DetailPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useSearchParams();
    const [parkingDetail, setDetail] = useState(null);
    const [price, setPrice] = useState(10);

    const [userProfile, setProfile] = useState(JSON.parse(localStorage.getItem("loginInfo")));


    useEffect(() => {
        async function fetchCollection() {
            let id = search.get('id');
            await getDocs(collection(db, parkingLocation))
                .then((querySnapshot) => {

                    let newData = querySnapshot.docs.filter((doc) => doc.id == id);
                    if (newData == null) {
                        return
                    }
                    newData = newData.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setDetail(newData[0]);
                    let pid = newData[0].id;
                    getDocs(collection(db, parkingPrices))
                        .then((querySnapshot) => {

                            let list = querySnapshot.docs.filter((doc) => doc.data().parking_location_id == pid);
                            if (list == null) {
                                return
                            }
                            list = list.map((doc) => doc.data().price);
                            console.log(list);
                            setPrice(list[0])
                        });
                });
        }
        fetchCollection();
    }, [search])

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem("loginInfo")))

    }, [localStorage.getItem("loginInfo")])

    const reserveSpot = () => {
        setDoc(doc(db, bookings, uuidv4()), {
            parkingId: parkingDetail.id,
            bookedBy: userProfile.email,
            closed: false,
            paid: false,
            price: price,
            date: new Date()
        }).then(() => {
            navigate("/");
        })
    }

    if (parkingDetail == null)
        return <></>
    return <Container>
        <div className="parkingdetailtitle my-2">
            {parkingDetail.name}
        </div>

        <div className="parkingdetaillocation">
            Location: {parkingDetail.location}
        </div>
        <div className="parkingdetaildescription my-3">{parkingDetail.description}</div>
        <div className="parkinginfo">Total Parking area: {parkingDetail.total_slots}</div>
        <div className="parkinginfo">Total Parked(Unavailable): {parkingDetail.total_slots}</div>
        <div className="parkinginfo">Total Area available: {parkingDetail.total_slots}</div>
        <div className="parkinginfo">Price: {price} per Hour</div>

        <span className="btn btn-primary btn-sm my-3" onClick={() => {
            if (userProfile != null) {
                reserveSpot();
            }
        }}>
            Reserve Now
        </span>
        <a className="mx-3 btn btn-secondary btn-sm my-3" href={"https://www.google.com/maps/@" + parkingDetail.lat + "," + parkingDetail.lng + ",16z"} target="_blank">
            Navigate to site
        </a>

        <div style={{ height: 400, width: "100%", marginTop: 30 }} >
            <MapBox center={{ lng: parkingDetail.lng, lat: parkingDetail.lat }}
                description={parkingDetail.name}
            />
        </div>
    </Container>
}
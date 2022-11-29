
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import LocationCard from "../../components/location_card";
import SearchForm from "../../components/searchform";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase_init";
import { parkingLocation } from "../../database/collections";
export default function SearchResultPage() {

    const [search, setSearch] = useSearchParams();
    const [locations, setLocation] = useState([]);

    useEffect(() => {
        async function fetchCollection() {
            let location = search.get('search');

            setLocation([])
            await getDocs(collection(db, parkingLocation))
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length == 0) {
                        setLocation([]);
                        return
                    }
                    let newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));

                    newData = newData.filter((doc) => location == null || doc.name.includes(location) || doc.location.includes(location))

                    console.log(newData)
                    setLocation(newData)
                });
        }
        fetchCollection();
    }, [search]);

    return (<Container className="py-5">
        <SearchForm location={search.get("location")} datetime={search.get("datetime")} />
        <div>
            {
                locations.length == 0 ? "No search result" :
                    locations.map((location) => <LocationCard location={location} />)
            }
        </div>
    </Container>)
}

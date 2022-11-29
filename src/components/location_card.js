import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MapBox } from "./mapbox";

export default function LocationCard({ location }) {
    return <Container className="locations-container">
        <Row>
            <Col style={{ paddingLeft: 30, paddingTop: 20, paddingBottom: 20 }}>
                <div className="location-name ">
                    {location.name}
                </div>
                <div className="location-location">
                    Location: {location.location}
                </div>

                <div className="location-description my-2">
                    {location.description}
                </div>
                <NavLink to={`/place?id=${location.id}`}>
                    Check avaibility
                </NavLink>
            </Col>
            <div style={{ minHeight: 200, width: 350, borderRadius: 6 }} >
                <MapBox center={{ lng: location.lng, lat: location.lat }}
                    description={location.name}
                />
            </div>

        </Row>
    </Container >
}

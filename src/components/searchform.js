import { useNavigate } from "react-router-dom";

export default function SearchForm({ location, datetime }) {
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        let location = event.target[0].value;

        navigate(`/places?search=${location}`)
    }
    return (
        <form onSubmit={onSubmit} className="input-group mb-3 d-flex">
            <input type="text" class="form-control" defaultValue={location} required placeholder="Eg. Sydney" aria-label="Location" aria-describedby="basic-addon1" />
            {/* <input type="datetime-local" class="form-control" defaultValue={datetime} required placeholder="Datetime" aria-label="Date Time" aria-describedby="basic-addon1" /> */}
            <input type="submit" class="btn btn-primary" aria-describedby="basic-addon1" value="Search" />
        </form>
    );
}
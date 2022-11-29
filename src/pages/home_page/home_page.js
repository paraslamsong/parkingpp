import SearchForm from "../../components/searchform";

export default function HomePage() {
    return <div className="home_display_image d-flex justify-content-center align-items-center">

        <div style={{ width: "40%" }}>
            <SearchForm />
        </div>
    </div >
}
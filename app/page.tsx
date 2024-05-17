import Container from "./components/Container";
import FileInput from "./components/inputs/FileInput";
import Map from "./components/map/Map";
import PostsList from "./components/PostsList";
import getPosts from "./actions/getPosts";
import { getCurrentUser } from "./actions/getCurrentUser";
import Filters from "./components/filters/Filters";

export default async function Home() {
    const posts = await getPosts();
    const currentUser = await getCurrentUser();
    // const [coordinates, setCoordinates] = useState<[number, number][]>([]);
    // const [center, setCenter] = useState<[number, number]>([
    //     46.9119382485954, 2.2651793849164115,
    // ]); //[43.68169106,3.84768334]

    return (
        <Container>
            <div
                className="
                    fixed
                    inset-0 
                    bg-gray-200
                    bg-opacity-50
                    flex flex-col
                    justify-start
                    items-center
                    pt-20
                    px-4
                    "
            >
                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        items-center
                        gap-2
                        rounded-md
                        mt-2
                        w-full
                        h-[85vh]
                        "
                >
                    <div
                        className="                        
                            rounded-md
                            w-full
                            h-3/5
                            md:w-1/2
                            md:h-full
                            flex
                            flex-col
                            gap-2
                                "
                    >
                        <div
                            className="
                                bg-white
                                p-4
                                md:py-4
                                rounded-md
                                shadow-lg
                                w-full
                                h-1/6
                                md:h-1/5
                                flex
                                flex-row
                                items-center
                                "
                        >
                            {/* <FileInput
                                title="Upload a file"
                                acceptedFileTypes=".gpx, .kml"
                                // onChange={() => {}}
                            /> */}
                            <Filters />
                        </div>
                        <div
                            className="bg-white
                                p-4
                                rounded-md
                                shadow-lg
                                w-full
                                h-full
                                md:h-5/6
                                "
                        >
                            <Map id="map" />
                        </div>
                    </div>
                    <PostsList currentUser={currentUser} posts={posts} />
                </div>
            </div>
        </Container>
    );
}

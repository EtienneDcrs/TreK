import Container from "./components/Container";
import Map from "./components/map/Map";
import PostsList from "./components/PostsList";
import getPosts from "./actions/getPosts";
import { getCurrentUser } from "./actions/getCurrentUser";
import Filters from "./components/filters/Filters";
import getPolylines from "./actions/getPolylines";
import { getAdminidtrators } from "./actions/getAdministrators";

export default async function Home() {
    const posts = await getPosts();
    const currentUser = await getCurrentUser();
    const polylines = await getPolylines();
    const admins = await getAdminidtrators();
    let isAdmin = false;
    if (currentUser) {
        isAdmin = admins.includes(currentUser?.id);
    }

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
                            <Map id="map" polylines={polylines} />
                        </div>
                    </div>
                    <PostsList
                        currentUser={currentUser}
                        posts={posts}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        </Container>
    );
}

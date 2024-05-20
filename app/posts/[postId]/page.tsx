import { getAdminidtrators } from "@/app/actions/getAdministrators";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getPolylineById from "@/app/actions/getPolylineById";
import getPostById from "@/app/actions/getPostById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/filters/EmptyState";
import MapPost from "@/app/components/map/MapPost";
import PostContent from "@/app/components/PostContent";

interface IParams {
    postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
    const post = await getPostById(params);
    const currentUser = await getCurrentUser();
    const polyline = await getPolylineById(params);
    const admins = await getAdminidtrators();
    let isAdmin = false;
    if (currentUser) {
        isAdmin = admins.includes(currentUser?.id);
    }

    if (!post) {
        return <EmptyState showReset />;
    }
    return (
        <>
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
                                md:w-1/2
                                h-full
                                flex
                                flex-col
                                gap-2
                                    "
                        >
                            <div
                                className="bg-white
                                    p-4
                                    rounded-md
                                    shadow-lg
                                    w-full
                                    h-full
                                    "
                            >
                                <MapPost
                                    id="post-map"
                                    polyline={polyline?.polyline}
                                />
                            </div>
                        </div>
                        <PostContent
                            currentUser={currentUser}
                            post={post}
                            isAdmin={isAdmin}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default PostPage;

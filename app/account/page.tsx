import { getAdminidtrators } from "@/app/actions/getAdministrators";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import Heading from "../components/Heading";
import getPostsByUser from "../actions/getPostsByUser";
import PostsList from "../components/PostsList";
import getPosts from "../actions/getPosts";
import { SafePost } from "../types";

const AccountPage = async () => {
    const currentUser = await getCurrentUser();
    const admins = await getAdminidtrators();
    const userPosts = await getPostsByUser({ userId: currentUser?.id });
    let favPosts = await getPosts();
    favPosts = favPosts.filter((post: SafePost) =>
        currentUser?.favoriteIds.includes(post.id)
    );
    let isAdmin = false;
    if (currentUser) {
        isAdmin = admins.includes(currentUser.id);
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
                        gap-12
                        "
                >
                    <div
                        className="
                            flex
                            flex-col
                            justify-start
                            items-center
                            bg-white
                            shadow-lg
                            rounded-md
                            mt-2
                            p-8
                            w-2/3
                            h-auto
                            overflow-y-auto
                            "
                    >
                        <Heading
                            title="Votre compte"
                            subtitle={`Bienvenue ${currentUser?.name}`}
                            center
                        />
                    </div>
                    <div
                        className="
                            rounded-md
                            w-2/3
                            h-auto
                            flex
                            flex-col
                            gap-2
                            "
                    >
                        <Heading title="Vos publications" />
                        <PostsList
                            currentUser={currentUser}
                            //posts={userPosts}
                            isAdmin={isAdmin}
                        />
                    </div>
                    <div
                        className="
                            rounded-md
                            w-2/3
                            h-auto
                            flex
                            flex-col
                            gap-2
                            "
                    >
                        <Heading title="Vos favoris" />
                        <PostsList
                            currentUser={currentUser}
                            //posts={favPosts}
                            isAdmin={isAdmin}
                        />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AccountPage;

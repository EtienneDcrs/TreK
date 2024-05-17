import getPostById from "@/app/actions/getPostById";
import EmptyState from "@/app/components/filters/EmptyState";

interface IParams {
    postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
    const post = await getPostById(params);

    if (!post) {
        return <EmptyState showReset />;
    }
    return (
        <div>
            <h1>{post?.title}</h1>
        </div>
    );
};

export default PostPage;

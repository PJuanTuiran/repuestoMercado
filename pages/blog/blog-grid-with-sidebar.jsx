import React, { useEffect } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import useGetPost from "~/hooks/useGetPost";
import usePostGroup from "~/hooks/usePostGroup";
import SidebarBlog from "~/components/shared/sidebar/SidebarBlog";

const BlogScreen = () => {
    const { getPosts, postItems, loading } = useGetPost();
    const { withGrid } = usePostGroup();

    useEffect(() => {
        getPosts({ _limit: 12 });
    }, []);

    const breadcrumb = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "Blog Grid",
        },
    ];

    // View
    const postsView = withGrid(postItems, loading, 2);
    return (
        <Container title="Blog">
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar ps-reverse">
                            <div className="ps-layout__left">
                                <SidebarBlog />
                            </div>
                            <div className="ps-layout__right">
                                <div className="ps-blog">{postsView}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogScreen;

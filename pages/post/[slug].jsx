import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArticleDetail from "~/components/elements/articles/ArticleDetail";
import Container from "~/components/layouts/Container";
import useGetPosts from "~/hooks/useGetPosts";
import BreadCrumb from "~/components/elements/BreadCrumb";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import FormPostComment from "~/components/shared/forms/FormPostComment";
import { connect } from "react-redux";
import SidebarBlog from "~/components/shared/sidebar/SidebarBlog";

const PostDetailPage = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const { post, getPostBySlug } = useGetPosts();

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug);
        }
    }, [slug]);

    let detailView;

    // views
    if (post) {
        detailView = <ArticleDetail post={post} />;
    }

    const breadcrumb = [
        {
            text: "Home",
            url: "/",
        },
        {
            text: "Blog",
            url: "/blog",
        },
        {
            text: post ? post.name : "detail",
        },
    ];

    return (
        <Container title={post ? post.title : "Post detail"}>
            <div className="ps-page ps-page--inner ps-page--post">
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
                                <div className="ps-blog">
                                    {detailView}
                                    <FormPostComment />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PostDetailPage;

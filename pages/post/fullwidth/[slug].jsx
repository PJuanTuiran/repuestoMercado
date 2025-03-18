import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "~/components/layouts/Container";
import useGetPosts from "~/hooks/useGetPosts";
import BreadCrumb from "~/components/elements/BreadCrumb";
import FormPostComment from "~/components/shared/forms/FormPostComment";
import { connect } from "react-redux";
import ArticleDetailFullwidth from "~/components/elements/articles/ArticleDetailFullwidth";
import RelatedPosts from "~/components/shared/sections/blog/RelatedPosts";
import ModuleArticleComments from "~/components/elements/articles/modules/ModuleArticleComments";

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
        detailView = <ArticleDetailFullwidth post={post} />;
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
                </div>

                <div className="ps-page__content">
                    <div className="container">{detailView}</div>
                    <RelatedPosts />
                    <div className="ps-post-comment container">
                        <ModuleArticleComments />
                        <FormPostComment />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default connect((state) => state)(PostDetailPage);

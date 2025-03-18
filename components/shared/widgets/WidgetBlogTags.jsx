import React from "react";
import Link from "next/link";

const WidgetBlogTags = () => {
    return (
        <aside className="widget widget_blog widget_tags">
            <h3 className="widget-title">Tags</h3>
            <div className="widget__content">
                <Link href="/blog">
                    <a>Beauty</a>
                </Link>
                <Link href="/blog">
                    <a>Motivation</a>
                </Link>
                <Link href="/blog">
                    <a>Women</a>
                </Link>
            </div>
        </aside>
    );
};

export default WidgetBlogTags;

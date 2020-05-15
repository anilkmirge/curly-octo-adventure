import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../components/AddCommentForm';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';
import UpvotesSection from '../components/UpvotesSection';
import articles from './article-content';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { name } = useParams();

    useEffect(() => {
        const fetchArticleInfo = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }

        fetchArticleInfo();
    }, [name]);

    const matchingArticle = articles.find(article => article.name === name);

    return matchingArticle
        ? (
            <>
            <UpvotesSection
                upvotes={articleInfo.upvotes}
                articleName={name}
                setArticleInfo={setArticleInfo} />
            {matchingArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
            <CommentsList comments={articleInfo.comments} />
            </>
        ) : (
            <NotFoundPage />
        )
}

export default ArticlePage;
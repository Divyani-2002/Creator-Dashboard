import axios from 'axios';

export const fetchRedditPosts = async (subreddit) => {
    try {
        const response = await axios.get(
            `https://www.reddit.com/r/${subreddit}/top.json?limit=10`,
            {
                headers: { 'User-Agent': 'CreatorDashboard/1.0' }
            }
        );

        return response.data.data.children.map(post => ({
            id: post.data.id,
            title: post.data.title,
            content: post.data.selftext,
            source: 'reddit',
            url: `https://reddit.com${post.data.permalink}`,
            date: new Date(post.data.created_utc * 1000),
            metrics: {
                upvotes: post.data.ups,
                comments: post.data.num_comments
            }
        }));
    } catch (err) {
        console.error('Reddit API error:', err);
        return [];
    }
};

import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

export const fetchTwitterPosts = async (query) => {
    try {
        const tweets = await client.v2.search(query, {
            'tweet.fields': ['created_at', 'public_metrics'],
            max_results: 10
        });

        return tweets.data.map(tweet => ({
            id: tweet.id,
            title: `Tweet by ${tweet.author_id}`,
            content: tweet.text,
            source: 'twitter',
            url: `https://twitter.com/i/web/status/${tweet.id}`,
            date: tweet.created_at,
            metrics: tweet.public_metrics
        }));
    } catch (err) {
        console.error('Twitter API error:', err);
        return [];
    }
};

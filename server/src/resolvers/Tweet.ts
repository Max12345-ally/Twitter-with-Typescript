
import { TwitterResolverContext } from "../resolvers";
import { TweetResolvers } from "../resolvers-types.generated";

const tweetTwitterResolver: TweetResolvers<TwitterResolverContext> = {
    author(tweet, _, { dbUserCache, dbTweetCache }) { 
        const dbTweet = dbTweetCache[tweet.id]
 
    if (!dbTweet)
        throw new Error(
            "Want to find author, but no tweet in db "
        )
        const dbUser = dbUserCache[dbTweet.userId]
        if (!dbUser)
        throw new Error(
            "Want to find author, but no author in db "
        )
        return dbUser
},
stats(tweet, _, { dbTweetToFavoriteCountMap}) {
    return {
        commentCount: 99,
        retweetCount: 1,
        favoriteCount:
        dbTweetToFavoriteCountMap[tweet.id] || 0,
    }
    }
}
export default tweetTwitterResolver
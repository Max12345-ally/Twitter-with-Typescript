import { TwitterResolverContext } from "../resolvers";
import { QueryResolvers } from "../resolvers-types.generated";
import { trendTransform, tweetTransform } from "../transforms";

const queryTwitterResolver: QueryResolvers<TwitterResolverContext>  = {
    
    trends: (_, __, { db }) => {
        return db.getAllTrends().map(trendTransform)
    },
    
    currentUser: (_, __, { db }) => {
        const [firstUser] = db.getAllUsers();
        if (!firstUser)
            throw new Error(
                `currentUSer was requested, but there are no users in the database`
            );
            return firstUser;
        },
    suggestions: (_, __, { db }) => {
        return db.getAllSuggestions() 
    },  
    tweets: (
        _parent,
        __args,
        { db, dbTweetToFavoriteCountMap, dbUserCache, dbTweetCache }
    ) => {
        db.getAllUsers().forEach((user) => {
            dbUserCache[user.id] = user;
        });
        db.getAllFavorites().forEach((favorite) => {
            const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
            dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
        });
        return db.getAllTweets().map((t) => {
            dbTweetCache[t.id] = t;
            return tweetTransform(t);
        });  
    },

}

export default queryTwitterResolver;
import { tweetTransform } from "../transforms";
import { TwitterResolverContext } from "../resolvers";
import { MutationResolvers } from "../resolvers-types.generated"

const mutationTwitterResolver: MutationResolvers<TwitterResolverContext> = {
    async createTweet(_parent, args, { dbTweetCache, db}) {
        const { body, userId } = args;
        const dbTweet = await db.createTweet({
            message: body,
            userId,
        });
        const dbTweetMap = (dbTweetCache ||= {});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dbTweetMap[dbTweet.td] = dbTweet;
        return tweetTransform(dbTweet);
    },
};

export default mutationTwitterResolver
import { TwitterResolverContext } from '../resolvers'
import { TrendResolvers } from '../resolvers-types.generated'

const trendTwitterResolver: TrendResolvers<TwitterResolverContext> = 
{
    __resolveType(obj, _context, _info ) {

        if (typeof (obj as any).hashtag === "string") {
            return "HashtagTrend"
        } else return "TopicTrend"
        return null
    },
}

export default trendTwitterResolver
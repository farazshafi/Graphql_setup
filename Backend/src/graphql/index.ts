import { userSchema } from './schemas/userSchema';
import { userResolver } from './resolvers/userResolver';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

export const typeDefs = mergeTypeDefs([userSchema]);
export const resolvers = mergeResolvers([userResolver]);

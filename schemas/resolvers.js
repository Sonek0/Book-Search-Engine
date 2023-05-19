const {AuthenticationError} = require ('apollo-server-express');
const {User} = require ('../models');
const {signToken} = require ('../utils/auth');

//aquiring a single profile
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select('')
                
                return userData;
            }
            throw new AuthenticationError('not logged in')
        },
    },

    //nutations to add, login save and remove book.
    Mutation: {
        addUser: async (partent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError ('Credentials inccorect');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError ('Credentials incorrect');
            }

            const token = signToken(user);
            return {token, user};
        },
        
        saveBook: async (parent, {bookData}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: bookData}},
                    {new: true}
                );
                
                return updatedUser;
            }
            throw new AuthenticationError ('Must be logged in!')
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError('Must be logged in!')
          } 
    }
}

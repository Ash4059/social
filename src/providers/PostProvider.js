import { createContext } from "react";

import { useProviderPosts } from "../hooks";

const initialState = {
    post : [],
    loading : true,
    addPostToState : () => {},
    addComment : () => {}
}

export const PostContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
    const posts = useProviderPosts();

    return (
        <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    )
}
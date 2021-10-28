import { useQuery } from "react-query"
import axios from "axios"

async function fetchCurrentUsers(){
    const {data} = await axios.get('/api/currentUser')
    return data
}
export function useCurrentUser(){
    return useQuery('user', () => fetchCurrentUsers())
}


async function fetchPosts(community_id){
    const {data} = await axios.get(`/api/allPostsOfCommunity?id=${community_id}`)
    return data
}
export function usePosts(community_id){
    return useQuery('posts', () => fetchPosts(community_id), {
        staleTime: 2000
    })
}

async function fetchSingleCommunity(community_id){
    const {data} = await axios.get(`/api/community?id=${community_id}`)
    return data
}
export function useSingleCommunity(community_id){
    return useQuery('singleCommunity', () => fetchSingleCommunity(community_id))
}

async function fetchSinglePost(post_id){
    if (post_id > 0){
    const {data} = await axios.get(`/api/post?id=${post_id}`)
    return data
    }
    else return
}
export function useSinglePost(post_id){
    return useQuery(['singlePost', post_id], () => fetchSinglePost(post_id), {
        staleTime: 20000
    })
}

async function fetchSubscribedCommunities(){
    const {data} = await axios.get(`/api/followedCommunities`)
    return data
}
export function useSubscribedCommunities(){
    return useQuery('subscribedCommunities', () => fetchSubscribedCommunities())
}

async function fetchReccomendedCommunities(){
    const {data} = await axios.get('/api/reccomendedCommunities')
    return data
}
export function useReccomendedCommunities(){
    return useQuery('reccomendedCommunities', () => fetchReccomendedCommunities())
}

async function fetchSearchedCommunities(searchQuery){
    const {data} = await axios.get(`/api/searchedCommunities?searchQuery=${searchQuery}`)
    return data
}
export function useSearchedCommunities(searchQuery){
    return useQuery(['searchedCommunities', searchQuery], () => fetchSearchedCommunities(searchQuery))
}
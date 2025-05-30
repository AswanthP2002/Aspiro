export default async function useRefreshToken(url : string){
    const response = await fetch(url, {
        method:'GET',
        credentials:'include'
    })

    const result = await response.json()

    return result?.accessToken
} 
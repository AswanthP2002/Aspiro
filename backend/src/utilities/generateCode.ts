export const generateCode = () => {
    let token : string = ""
    for(let i = 1; i <= 6; i++){
        let digit : number = Math.round(Math.random() * 10)
        token += digit
    }

    console.log('Token generated', token.slice(0, 6))
    return token.slice(0, 6)
}
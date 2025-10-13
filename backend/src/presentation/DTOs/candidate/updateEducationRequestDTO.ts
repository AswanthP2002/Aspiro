export interface UpdateEducationRequestDto {
    id : string
    stream : string //particular group of education
    level : string
    organization : string
    location : string
    startYear : string,
    isPresent : boolean
    endYear? : string
}
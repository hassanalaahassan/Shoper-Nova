
export interface ISignupResponse{
  message:string
  token:string
  user:IUser
}
export interface IUser{
  name:string
  email:string
  role:string
}

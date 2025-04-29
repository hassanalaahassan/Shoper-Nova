
export interface ISignupResponse{
  message:string
  token:string
  user:IUser
}
export interface IOtpResponse{
  statusMsg:string
  message:string
}
export interface IUser{
  name:string
  email:string
  role:string
  token:string
}

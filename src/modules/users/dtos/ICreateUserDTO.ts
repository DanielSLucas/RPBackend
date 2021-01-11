export default interface ICreateUserDTO {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: 'ADM' | 'OWNER' | 'USER';
}

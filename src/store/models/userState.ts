export interface IUserState {
  user: Readonly<firebase.User> | null;
  loading: boolean
}

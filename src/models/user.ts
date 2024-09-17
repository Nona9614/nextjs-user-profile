/** The representation of name data from the user */
export interface UserName {
  /** The first name of the user */
  first: string;
  /** The last name of the user */
  last: string;
}

/** A representation of some user */
export default interface User {
  /** The user id string */
  id: string;
  /** User name data */
  name: UserName;
  /** User friends as an array of User Id */
  friends?: string[];
  /** Brief description of the user */
  presentation?: string;
  /** Possible "url" link to some user picture */
  icon?: string;
}

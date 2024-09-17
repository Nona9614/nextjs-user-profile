// Styles
import styles from "./UserList.module.css";
// Next JS
import Link from "next/link";
// Models
import User from "@/models/user.js";

type UserListItemProps = {
  user: Required<User>;
};
function UserListItem({ user }: UserListItemProps) {
  return (
    <li>
      <Link href={{ pathname: `user/${user.id}` }}>
        <i dangerouslySetInnerHTML={{ __html: user.icon }}></i>
        <span>
          {user.name.first}&nbsp;{user.name.last}
        </span>
      </Link>
    </li>
  );
}

type UserListProps = {
  users: Required<User>[];
};
export default async function UserList({ users }: UserListProps) {
  return (
    <ul className={styles["user-list"]}>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

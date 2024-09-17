// Styles
import styles from "./UserList.module.css";
// i18n
import { useTranslations } from "next-intl";
// Models
import type User from "@/models/user";

type UserFriendsProps = {
  friends: string[];
};
function UserFriends({ friends }: UserFriendsProps) {
  const t = useTranslations("user-panel");

  if (friends.length) {
    return (
      <section className={styles["user-friends"]}>
        <span>{t("friends")}:</span>
        <ul>
          {friends.map((friend) => (
            <li key={friend}>{friend}</li>
          ))}
        </ul>
      </section>
    );
  } else {
    return null;
  }
}

type UserProps = { user: Required<User> };
export default function User({ user }: UserProps) {
  const name = `${user.name.first} ${user.name.last}`;
  return (
    <article className={styles.user}>
      <h2>
        <i dangerouslySetInnerHTML={{ __html: user.icon }}></i>
        <span>{name}</span>
      </h2>
      <h3>{user.id}</h3>
      <UserFriends friends={user.friends} />
    </article>
  );
}

// Services
import { getUsers } from "@/services/users.service.ts";
// Components
import UserList from "@/components/UserList.tsx";

/** Default main page entry */
export default async function Home() {
  // Fetch the users from the API
  const users = await getUsers();
  // Renders the list for the main page
  return <UserList users={users} />;
}

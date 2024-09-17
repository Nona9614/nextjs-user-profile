// Services
import { getUser } from "@/services/users.service.ts";
// Components
import User from "@/components/User.tsx";

/** Default main page entry */
export default async function Home({
  params,
}: {
  params: Record<string, string>;
}) {
  // Recovers the id from the request
  const id = params.id;
  // Fetch the users from the API
  const user = await getUser(id);
  // Renders the list for the main page
  return <User user={user} />;
}

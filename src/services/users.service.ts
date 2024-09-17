import User from "@/models/user";
import unpack from "@/utils/unpack";
import { getMessages } from "next-intl/server";

/** Caches the SVG content if already requested */
const cache = new Map<string, string>();

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const json = async <T extends unknown>(
  url: string,
  method?: string,
  body?: BodyInit
): Promise<T> => {
  // Fetches the content
  const response = await fetch(url, {
    method: method ?? "GET",
    headers: {
      Accept: "application/json",
    },
    body,
  });
  // Parses as JSON object then return
  return response.json();
};

const svg = async (url: string) => {
  // Fetches the content
  const response = await fetch(url, {
    headers: {
      Accept: "text/plain",
    },
  });
  // Parses as JSON object then return
  return response.text();
};

/** Use the same empty reference for default an empty array */
const nofriends: string[] = [];

/** The default user data */
type DefaultUserData = { presentation: string; icon: string };
/** Recovers the default values from a user */
const defaultUser = async () => {
  const messages = await getMessages();
  const defaults = unpack<DefaultUserData>(messages, "user-default");
  defaults.icon = await svg(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_USER_ICON}`
  );
  return defaults;
};

/** Defaults the values for a user */
const safe = async (user: User, defaults: DefaultUserData) => {
  // Replaces the icon with a reference of the icon data
  if (user.icon) {
    // If there no cached data stores it
    if (!cache.has(user.icon)) {
      const text = await svg(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${user.icon}`
      );
      cache.set(user.icon, text);
    }
    // Use the cached data to update the user icon data replacinf the actual image
    user.icon = cache.get(user.icon!);
  }
  // If an icon is not found uses the default data
  else user.icon = defaults.icon;
  // If no presentation is present, appends the default presentation
  if (!user.presentation) user.presentation = defaults.presentation;
  // Add an empty list of friends if none is present
  if (!user.friends) user.friends = nofriends;
};

/** Returns from the server the stored users */
export async function getUsers() {
  // Gets the default data
  const defaults = await defaultUser();
  // Gets the users
  const users = await json<User[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
  );
  // Gets the SVG content and caches if not found
  for (let i = 0; i < users.length; i++) {
    await safe(users[i], defaults);
  }
  // Returns the mapped users
  return users as Required<User>[];
}

/** Returns the information for a specific user */
export async function getUser(id: string) {
  // Gets the default data
  const defaults = await defaultUser();
  // Recovers the user from the API
  const user = await json<User>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    "POST",
    JSON.stringify({ id })
  );
  // Ensures the user data
  await safe(user, defaults);
  // Returns the found user
  return user as Required<User>;
}

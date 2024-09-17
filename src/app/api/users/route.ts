import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import users from "../../../users.json";

// To GET all users
export async function GET() {
  return NextResponse.json(users, { status: 200 });
}

// To recover a specific user using POST
export async function POST(request: NextApiRequest) {
  const body = request.body as ReadableStream;
  const reader = body.getReader();

  let string = "";
  let chunk: { done: boolean; value?: string } = await reader.read();
  while (!chunk.done) {
    string += chunk.value;
    chunk = await reader.read();
  }

  const id = JSON.parse(string).id;
  const user = users.find((user) => user.id === id)!;
  return NextResponse.json(user, { status: 200 });
}

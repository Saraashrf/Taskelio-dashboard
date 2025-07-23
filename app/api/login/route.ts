import { NextResponse } from "next/server";

interface userType {
  id: string;
  email: string;
  password: string;
}
const users: userType[] = [
  {
    id: "u1",
    email: "sara@gmail.com",
    password: "12345",
  },
  {
    id: "u2",
    email: "mariam@gmail.com",
    password: "12345",
  },
];
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u: userType) => {
    return u.email === email && u.password === password;
  });
  if (user) {
    return NextResponse.json({
      user: { id: user?.id, email: user?.email },
      token: "mock-token" + user?.id,
    });
  }
  // If credentials are wrong
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

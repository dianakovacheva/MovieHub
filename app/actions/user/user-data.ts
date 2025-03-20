import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { compare } from "bcrypt-ts";

export default async function getUserByEmail(
  email: string,
  hashPassword: string
) {
  if (!email || !hashPassword) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user?.password) return null;

  const passwordMatch = await compare(hashPassword, user.password);

  if (!passwordMatch) return null;

  return {
    user,
    id: user.id,
    email: user.email,
  };
}

// Get user by id

export async function getUserById(userId: string | undefined) {
  if (!userId) return null;

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) return null;

    return user[0];
  } catch (error) {
    console.log((error as Error).message);
  }
}

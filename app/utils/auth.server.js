import { Authenticator, AuthorizationError } from "remix-auth";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});

//export const authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const email = form.get("email");
    const password = form.get("password");

    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "email must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    const user = await verifyLogin(email, password);
    if (user) {
      return await Promise.resolve({ ...user });
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  })
);

export async function signup(form) {
  const email = form.get("email");
  const password = form.get("password");

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new AuthorizationError(
      "A user with the provided email address exists already."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email: email, password: hashedPassword },
  });
}

export async function verifyLogin(email, password) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password);

  if (!isValid) {
    return null;
  }

  return { ...userWithPassword };
}

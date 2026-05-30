"use client";
import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  return (
    <main className="flex-1 bg-gray-900 text-white">
      {`Hello there`}

      {isSignedIn ? (
        <div>
          <UserButton />
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

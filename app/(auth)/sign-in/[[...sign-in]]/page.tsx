import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="h-screen w-full bg-primary flex justify-center items-center">
      <SignIn path="/sign-in" />
    </div>
  )
}
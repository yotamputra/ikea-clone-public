import { Input } from "@/components/ui/input";
import { handleRegister } from "@/actions";
import { RegisterButton } from "@/components/RegisterButton";
import ErrorNotification from "@/components/ErrorNotification";

export default function Register() {
  return (
    <div className="flex flex-2">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-gray-800 text-4xl font-bold max-w-md text-center">
          Create personal account
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="rounded-lg p-8 w-full max-w-md">
          <ErrorNotification />
          <form className="space-y-4 pt-1" action={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 pb-1"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900 pb-1"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                name="username"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 pb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="pb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 pb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mt-6">
              <RegisterButton />
            </div>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

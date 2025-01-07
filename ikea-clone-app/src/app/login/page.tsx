import { Input } from "@/components/ui/input";
import { handleLogin } from "@/actions";
import ErrorNotification from "@/components/ErrorNotification";
import { SubmitButton } from "@/components/SubmitButton";

export default function Login() {
  return (
    <div className="flex flex-2/3">
      <div className="flex-1 flex items-center justify-center mr-7">
        <h1 className="text-4xl font-bold max-w-md text-center">
          Login to IKEA Family Account
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center ml-7">
        <div className="rounded-lg p-8 w-full max-w-md">
          <form className="space-y-4" action={handleLogin}>
            <ErrorNotification/>
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
                name="email"
                placeholder="Enter your email"
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
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mt-6">
              <SubmitButton/>
            </div>
          </form>

          <a
            href="/register"
            className="text-center text-blue-700 hover:underline mt-3 flex justify-center"
          >
            Register a new account
          </a>
        </div>
      </div>
    </div>
  );
}

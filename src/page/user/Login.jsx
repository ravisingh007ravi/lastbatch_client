import { useState } from "react";
import { GoogleLogin } from "../../context/GoogleLogin";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingBag, FiShield, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthData";

export default function Login() {
  const { loginWithGoogle, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError("");

      if (!credentialResponse?.credential) {
        throw new Error("No credential token received from Google.");
      }

      await loginWithGoogle(credentialResponse.credential);
      setSuccess(true);
      navigate("/");

    } catch (err) {

      setError(err.message || "Google sign-in was unsuccessful. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in popup was cancelled or failed. Please try again.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 transition-colors duration-200 dark:bg-zinc-950">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2 dark:border dark:border-zinc-800 dark:bg-zinc-900">
        {/* Left panel */}
        <div className="hidden flex-col justify-between bg-black p-10 text-white md:flex lg:p-14 dark:bg-zinc-950">
          <Link to="/" className="text-2xl font-black tracking-tight">
            TECH<span className="text-gray-400 dark:text-zinc-500">ZONE.</span>
          </Link>

          <div>
            <FiShoppingBag size={44} className="mb-7 text-gray-300 dark:text-zinc-500" />
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              Shopping made simple.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-gray-400 dark:text-zinc-400">
              Sign in to explore products, manage your orders, and save your
              favorite items.
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-zinc-500">
            Your everyday shopping destination.
          </p>
        </div>

        {/* Right panel */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-sm">
            <Link to="/" className="mb-10 block text-xl font-black md:hidden dark:text-white">
              TECH<span className="text-gray-400 dark:text-zinc-500">ZONE.</span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-zinc-400">
                Welcome back
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-zinc-400">
                Continue with Google for instant, secure access.
              </p>
            </div>

            {isAuthenticated && user && !success && (
              <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800">
                <p className="text-sm text-gray-700 dark:text-zinc-300">
                  You are already signed in as <span className="font-semibold text-gray-900 dark:text-white">{user.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mt-3 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Go to Home
                </button>
              </div>
            )}

            <div className="flex min-h-[50px] flex-col items-center justify-center">
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent dark:border-white dark:border-t-transparent"></div>
                  <span>Signing you in securely...</span>
                </div>
              ) : success ? (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                  <FiCheckCircle size={18} />
                  <span>Signed in successfully! Redirecting...</span>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text="continue_with"
                    shape="rectangular"
                    theme="outline"
                    size="large"
                    width="320"
                  />
                </div>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
              >
                <FiAlertCircle className="mt-0.5 shrink-0 text-red-500" size={17} />
                <p>{error}</p>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:border dark:border-zinc-800 dark:bg-zinc-800/60">
              <FiShield className="mt-0.5 shrink-0 text-gray-600 dark:text-zinc-400" size={19} />
              <p className="text-xs leading-5 text-gray-500 dark:text-zinc-400">
                Your sign-in is verified securely by our server. We never ask
                for your Google password.
              </p>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-black underline underline-offset-4 hover:text-gray-700 dark:text-white dark:hover:text-zinc-300"
              >
                Sign up
              </Link>
            </p>

            <p className="mt-6 text-center text-xs text-gray-400 dark:text-zinc-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

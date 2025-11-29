import { useParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export default function VerifyEmail() {
  const { token } = useParams();
  const { loading, error, message } = useVerifyEmail(token);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="card glass max-w-md w-full p-8 relative rounded-xl shadow-2xl text-center">
        {loading && <p>Verifying your email...</p>}

        {!loading && !error && (
          <>
            <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
            <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
            <p className="muted mb-6">{message}</p>
            <Link
              to="/login"
              className="btn-primary inline-block px-6 py-2 rounded mt-4"
            >
              Go to Login
            </Link>
          </>
        )}

        {!loading && error && (
          <>
            <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
            <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
            <p className="muted mb-6">{error}</p>
            <Link
              to="/register"
              className="btn-primary inline-block px-6 py-2 rounded mt-4"
            >
              Try Registering Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function VerifyEmailPending() {
  const cardRef = useRef(null);

//   useEffect(() => {
//     gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 0.6 });
//   }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div ref={cardRef} className="card glass max-w-md w-full p-8">

        <h1 className="h1 gold-text mb-2">Verify Your Email</h1>
        <p className="muted text-sm">
          A verification link has been sent to your email.  
          Please check your inbox.
        </p>

      </div>
    </div>
  );
}

import { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";

export default function TwoFAEnabled({ recoveryCodes }) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([recoveryCodes.join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto text-center p-8  rounded-xl shadow-lg">
      <CheckCircle2 size={60} className="text-green-400 mx-auto mb-4" />

      <h1 className="text-3xl font-bold mb-2 text-yellow-400">
        2FA Enabled!
      </h1>

      <p className="text-gray-300 mb-4">
        Your account now has extra protection. Save these recovery codes safely. Each code can be used only once.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {recoveryCodes.map((code, i) => (
          <div
            key={i}
            className="p-2 bg-gray-700 text-white rounded font-mono text-center border border-gray-600 hover:bg-gray-600 transition"
          >
            {code}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleCopy}
          className="btn-primary px-4 py-2 flex items-center gap-2"
        >
          {copied ? "Copied!" : "Copy All"}
        </button>
        <button
          onClick={handleDownload}
          className="btn-secondary px-4 py-2 flex items-center gap-2"
        >
          <Download size={16} /> Download
        </button>
      </div>

      <button
        className="btn-primary w-full"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

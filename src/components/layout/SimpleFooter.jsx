import React from "react";

export default function SimpleFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MeetWise. Made with{" "}
          <a
            href="https://hotelmurah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-600 underline-offset-2 hover:underline transition-colors"
          >
            hotelmurah.com
          </a>{" "}
          in Indonesia
        </p>
      </div>
    </footer>
  );
}

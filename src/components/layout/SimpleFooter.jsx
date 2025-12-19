import React from "react";

export default function SimpleFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} MeetWise. Made with ❤️ in Indonesia
        </p>
      </div>
    </footer>
  );
}

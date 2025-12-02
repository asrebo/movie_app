"use client"    

export default function BackButton() {
  return (
    <div className="back" onClick={() => window.history.back()}></div>
  );
}
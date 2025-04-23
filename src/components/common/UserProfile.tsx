export default function UserProfile() {
  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2.5 py-1 shadow-sm">
      {/* Small avatar circle */}
      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold text-lg border border-white shadow -ml-1">
        {/* Fallback: initials */}
        AS
      </div>
      <div className="flex flex-col items-start ml-1">
        <span className="text-xs text-gray-700 -mb-0.5">Hi Amy!</span>
        <span className="text-xs font-semibold text-gray-900 leading-none">Amy Silver</span>
      </div>
    </div>
  )
}

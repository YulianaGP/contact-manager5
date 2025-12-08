export default function ContactCard({
  name = "My First Contact",
  phone = "555-1234",
  email = "contact@email.com",
  isFavorite = false,
  onToggleFavorite = () => {},
  onDelete = () => {},
}) {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <article
      className="
        h-full w-full flex flex-col justify-between
        bg-white dark:bg-slate-900 
        rounded-2xl shadow-sm 
        border border-gray-200 dark:border-slate-700 
        p-5 transition
      "
      role="article"
      aria-label={`Contact ${name}`}
    >
      {/* --- Top content --- */}
      <div className="sm:flex sm:items-center sm:gap-4">
        {/* Avatar */}
        <div
          className="
            flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 
            rounded-full bg-indigo-600 text-white 
            flex items-center justify-center
            font-semibold text-lg
          "
        >
          {initials}
        </div>

        {/* Name + info */}
        <div className="mt-3 sm:mt-0 w-full">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="
                text-lg font-semibold 
                text-slate-800 dark:text-slate-100 
                block max-w-[70%] truncate
              "
            >
              {name}
            </h3>

            {/* ⭐ Favorite Button */}
            <button
              onClick={onToggleFavorite}
              className={`px-2 py-1 text-sm rounded-md transition active:scale-95 ${isFavorite ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'}`}
              aria-label={`Mark ${name} as favorite`}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {/* Phone */}
            <p className="flex items-center gap-2">
              <span aria-hidden="true">📱</span>
              <span className="block max-w-full truncate">{phone}</span>
            </p>

            {/* Email */}
            <p className="flex items-center gap-2">
              <span aria-hidden="true">✉️</span>
              <span className="block max-w-full break-words">{email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Footer actions --- */}
      <div className="mt-4 flex items-center justify-between gap-2">
        {/* Edit Button */}
        <button
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
          aria-label={`Edit ${name}`}
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete()}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-600 text-white rounded-md text-sm hover:bg-rose-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition"
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>

        <button
          className="px-3 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
          aria-label={`Call to ${name}`}
        >
          Details
        </button>
      </div>
    </article>
  );
}

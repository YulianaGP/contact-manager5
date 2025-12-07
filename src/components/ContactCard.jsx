export default function ContactCard({
  name = "My First Contact",
  phone = "555-1234",
  email = "contact@email.com",
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
      aria-label={`Contacto ${name}`}
    >
      {/* --- Top content --- */}
      <div className="sm:flex sm:items-center sm:gap-4">
        {/* Avatar */}
        <div
          className="
            flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 
            rounded-full bg-blue-600 text-white 
            flex items-center justify-center
            font-semibold text-lg
          "
        >
          {initials}
        </div>

        {/* Name + info */}
        <div className="mt-3 sm:mt-0">
          <h3
            className="
              text-lg font-semibold 
              text-slate-800 dark:text-slate-100 
              block max-w-full truncate
            "
          >
            {name}
          </h3>

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

      {/* --- Footer actions (opcionales) --- */}
      {/* Puedes comentar esta sección si no quieres botones */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          className="
            inline-flex items-center gap-2 px-3 py-1.5 
            bg-blue-600 text-white rounded-md text-sm
            hover:bg-blue-700 
            active:scale-[0.99] 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
            transition
          "
          aria-label={`Editar ${name}`}
        >
          Edit
        </button>

        <button
          className="
            px-3 py-1.5 text-sm rounded-md
            bg-gray-100 dark:bg-gray-800 
            text-slate-700 dark:text-gray-200
            hover:bg-gray-200 dark:hover:bg-gray-700 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
            transition
          "
          aria-label={`Llamar a ${name}`}
        >
          Call
        </button>
      </div>
    </article>
  );
}

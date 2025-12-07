export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center 
                       text-sm text-gray-600 dark:text-gray-400
                       bg-white dark:bg-gray-900 border-t 
                       border-gray-200 dark:border-gray-700">
      <p className="mb-1">© {new Date().getFullYear()} Contact Manager</p>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <p className="mb-1">© {new Date().getFullYear()} Contact Manager</p>
    </footer>
  );
}

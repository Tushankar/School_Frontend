export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} NextTail. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

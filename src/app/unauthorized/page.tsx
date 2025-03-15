import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl tracking-tight font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl mb-4">Unauthorized Access</h1>
          <p className="mb-6 text-gray-600">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>
          <Link 
            href="/"
            className="inline-block bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-3 fixed bottom-0 w-full">
        <div className="container mx-auto px-4">
          <div className="text-lg mb-1 font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
} 
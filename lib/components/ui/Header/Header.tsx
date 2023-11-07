export default function Header ({ title }: { title: string }) {
  return (
    <header className="bg-sky-800 py-12 px-8">
      <h1 className="text-white text-4xl font-bold">{title}</h1>
    </header>
  )
}
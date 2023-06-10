import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div>Index page</div>
      <Link href="/about/1">Go to about</Link>
    </>
  )
}
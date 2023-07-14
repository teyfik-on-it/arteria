import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className="w-28 h-8 flex items-center">
        <span className="select-none text-xl">Arteria</span>
      </div>
    </Link>
  );
}

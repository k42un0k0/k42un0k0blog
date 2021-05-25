import Link from 'next/link';

function Blogs(): JSX.Element {
  return (
    <div>
      <h1>blogs page</h1>
      <Link href="/blogs/edit">goto blogs edit page</Link>
    </div>
  );
}

export default Blogs;

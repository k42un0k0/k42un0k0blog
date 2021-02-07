import Link from "next/link"
const Home = () => {
  return <div>
    <h1>
      home page
    </h1>
    <Link href="/blogs"> goto blogs page </Link>
  </div>;
}

export default Home;
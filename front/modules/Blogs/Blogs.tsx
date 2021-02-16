import Link from "next/link"
import React from "react"

const Blogs = () => {
  return <div>
    <h1>blogs page</h1>
    <Link href="/blogs/edit">goto blogs edit page</Link>
  </div>;
}

export default Blogs;
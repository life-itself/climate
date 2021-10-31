import fs from 'fs'
import path from 'path'

import Layout from '../components/Layout'
import Link from 'next/link'

import parse from '../lib/markdown.js'

import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import CustomLink from '../components/CustomLink'

const components = {
  a: CustomLink,
}


export default function Home({ source, frontMatter }) {
  return (
    <Layout title="home">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 flex-1 px-20 w-full text-center">
        <h1 className="text-6xl font-bold">
          Life Itself Climate Inquiry
        </h1>
        <p className="mt-3 text-2xl">
          Life Itself's ongoing inquiry into the climate crisis 🌍🔥 
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="#overview"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10"
            >
              Read More
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link href="/without-hot-air/">
              <a
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-yellow-300 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                Without the Hot Air
              </a>
            </Link>
          </div>
        </div> 
      </div>
      <article id="overview" className="prose mx-auto p-6">
        <MDXRemote {...source} components={components} />
      </article>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const postFilePath = path.join('..', 'content', 'home.md')
  const source = fs.readFileSync(postFilePath)

  const { mdxSource, frontMatter } = await parse(source)

  return {
    props: {
      source: mdxSource,
      frontMatter: frontMatter,
    },
  }
}


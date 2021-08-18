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
      </div>
      <article className="prose mx-auto p-6">
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


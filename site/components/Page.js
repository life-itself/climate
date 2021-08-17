import Layout from '../components/Layout'

import { MDXRemote } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import CustomLink from '../components/CustomLink'

const components = {
  a: CustomLink,
  Head,
}

export default function Page({ children, source, frontMatter }) {
  return (
    <Layout title={frontMatter.title}>
      <header>
        <div className="mb-6">
          <h1>{frontMatter.title}</h1>
          {frontMatter.author && (
            <div className="-mt-6"><p className="opacity-60 pl-1">{frontMatter.author}</p></div>
          )}
          {frontMatter.description && (
            <p className="description">{frontMatter.description}</p>
          )}
        </div>
      </header>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </Layout>
  )
}

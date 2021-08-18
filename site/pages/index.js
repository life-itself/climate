import Layout from '../components/Layout'

export default function Home() {
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
    </Layout>
  )
}

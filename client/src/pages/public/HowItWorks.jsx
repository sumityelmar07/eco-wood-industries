import Layout from '../../components/layout/Layout'

const steps = [
  { step: '1', title: 'Submit Request', desc: 'Tell us what wood you need or want to recycle.' },
  { step: '2', title: 'Get a Quote', desc: 'We assess your request and provide a fair quote.' },
  { step: '3', title: 'Confirm Order', desc: 'Approve the quote and confirm your order.' },
  { step: '4', title: 'Delivery / Pickup', desc: 'We handle delivery or pickup at your convenience.' },
]

export default function HowItWorks() {
  return (
    <Layout>
      <section className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-green-800 mb-10">How It Works</h1>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                {s.step}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-green-800">{s.title}</h2>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

import React, { useState, useEffect } from 'react'
import { CheckCircle, X, DollarSign } from 'lucide-react'
import Button from '@/components/common/Button'

const QuoteResponses: React.FC = () => {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [price, setPrice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchQuoteRequests()
  }, [])

  const fetchQuoteRequests = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/inquiries?status=Quote Requested')
      const data = await response.json()
      if (data.success) {
        setQuotes(data.data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Update inquiry with price and status
      const response = await fetch(`http://localhost:5001/api/inquiry/${selectedQuote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseInt(price),
          status: 'Quote Sent'
        })
      })

      const data = await response.json()
      if (data.success) {
        setQuotes(quotes.filter(q => q.id !== selectedQuote.id))
        setSelectedQuote(null)
        setPrice('')
      }
    } catch (error) {
      console.error('Error sending quote:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading quotes...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary-900 mb-6">Quote Requests</h1>

      {quotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-secondary-600">No pending quote requests</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-secondary-900">{quote.name}</h3>
                  <p className="text-sm text-secondary-600">{quote.email}</p>
                  <p className="text-sm text-secondary-600">{quote.phone}</p>
                  {quote.company && <p className="text-sm text-secondary-600">{quote.company}</p>}
                  {quote.message && <p className="text-sm text-secondary-700 mt-2">{quote.message}</p>}
                </div>
                <button
                  onClick={() => setSelectedQuote(quote)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700"
                >
                  Set Price
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Set Price Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-secondary-900">Set Price for {selectedQuote.name}</h3>
              <button onClick={() => setSelectedQuote(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSendQuote}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-1">Quote Amount (KES)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter amount"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Sending Quote...' : 'Send Quote to Client'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuoteResponses
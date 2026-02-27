'use client'

import { Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { submitProjectRequest } from '@/lib/api'

interface ContactSectionProps {
  dictionary: {
    title: string
    formTitle: string
    fullName: string
    projectTitle: string
    description: string
    contactInfo: string
    submit: string
    sending: string
    success: string
    sendAnother: string
    error: string
  }
}

export function ContactSection({ dictionary }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    project_title: '',
    description: '',
    contact_info: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      await submitProjectRequest(formData)
      setStatus('success')
      setFormData({
        full_name: '',
        project_title: '',
        description: '',
        contact_info: '',
      })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : dictionary.error)
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{dictionary.success}</h2>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-accent hover:underline font-medium"
        >
          {dictionary.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{dictionary.title}</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <p className="text-sm text-muted-foreground">{dictionary.formTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
              {dictionary.fullName}
            </label>
            <input
              type="text"
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              required
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label htmlFor="project_title" className="block text-sm font-medium text-foreground mb-2">
              {dictionary.projectTitle}
            </label>
            <input
              type="text"
              id="project_title"
              value={formData.project_title}
              onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              required
              disabled={status === 'loading'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact_info" className="block text-sm font-medium text-foreground mb-2">
            {dictionary.contactInfo}
          </label>
          <input
            type="text"
            id="contact_info"
            value={formData.contact_info}
            onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
            required
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            {dictionary.description}
          </label>
          <textarea
            id="description"
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none text-sm md:text-base"
            required
            disabled={status === 'loading'}
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 w-full md:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-accent text-accent-foreground rounded-xl font-medium hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === 'loading' ? (
            dictionary.sending
          ) : (
            <>
              <Send className="w-4 h-4" />
              {dictionary.submit}
            </>
          )}
        </button>
      </form>
    </div>
  )
}

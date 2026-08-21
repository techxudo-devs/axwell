"use client";

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, HelpCircle, MessageSquare, Send, UserRound } from 'lucide-react'

const EMAILJS_SERVICE_ID = 'service_gdipzyr'
const EMAILJS_TEMPLATE_ID = 'template_o365w1f'
const EMAILJS_PUBLIC_KEY = 'YCQqjBVRZovx6t5Q9'

const ENQUIRY_LABELS: Record<string, string> = {
  production: 'Film Production',
  creative: 'Creative Visual Campaign',
  event: 'Event Management',
  other: 'General Inquiry',
}

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [enquiry, setEnquiry] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          phone: phone,
          enquiry: ENQUIRY_LABELS[enquiry] || enquiry,
          message: message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setIsSubmitted(true)

      setTimeout(() => {
        setName("")
        setEmail("")
        setPhone("")
        setEnquiry("")
        setMessage("")
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Failed to send enquiry:', error)
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-6 bg-white/[0.01] border border-white/10 rounded-lg text-center select-none z-10 relative overflow-hidden h-[450px]">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#0FB6AE]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#491833]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 rounded-full bg-[#0FB6AE]/10 border border-[#0FB6AE]/30 flex items-center justify-center mb-6 animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-[#0FB6AE]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h3 className="font-plus text-xl font-black text-white tracking-wide mb-2 select-none uppercase">
          ENQUIRY RECEIVED
        </h3>
        <p className="font-plus text-xs text-slate-300 font-light max-w-xs leading-relaxed select-none">
          Thank you for connecting. We will review your message and get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5 z-10 select-none">
      
      {/* Name Input (Required) */}
      <div className="relative flex items-center bg-white/[0.02] border border-white/10 focus-within:border-[#0FB6AE]/40 transition-all duration-300 px-4 py-3.5 rounded-lg w-full group">
        <UserRound size={16} className="text-cyan-400 group-focus-within:text-[#0FB6AE] transition-colors duration-300" />
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name" 
          required
          className="bg-transparent text-white placeholder-slate-500 text-sm w-full ml-3 focus:outline-none font-plus"
        />
      </div>

      {/* Email Input (Required) */}
      <div className="relative flex items-center bg-white/[0.02] border border-white/10 focus-within:border-[#0FB6AE]/40 transition-all duration-300 px-4 py-3.5 rounded-lg w-full group">
        <Mail size={16} className="text-cyan-400 group-focus-within:text-[#0FB6AE] transition-colors duration-300" />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address" 
          required
          className="bg-transparent text-white placeholder-slate-500 text-sm w-full ml-3 focus:outline-none font-plus"
        />
      </div>

      {/* Phone Number Input (Required) */}
      <div className="relative flex items-center bg-white/[0.02] border border-white/10 focus-within:border-[#0FB6AE]/40 transition-all duration-300 px-4 py-3.5 rounded-lg w-full group">
        <Phone size={16} className="text-cyan-400 group-focus-within:text-[#0FB6AE] transition-colors duration-300" />
        <input 
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number" 
          required
          className="bg-transparent text-white placeholder-slate-500 text-sm w-full ml-3 focus:outline-none font-plus"
        />
      </div>

      {/* Enquiry Dropdown Input (Required) */}
      <div className="relative flex items-center bg-white/[0.02] border border-white/10 focus-within:border-[#0FB6AE]/40 transition-all duration-300 px-4 py-3.5 rounded-lg w-full group">
        <HelpCircle size={16} className="text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" />
        <select 
          value={enquiry}
          onChange={(e) => setEnquiry(e.target.value)}
          required
          className="bg-transparent text-slate-400 text-sm w-full ml-3 focus:outline-none font-plus cursor-pointer appearance-none"
        >
          <option value="" disabled hidden>Select Enquiry Type</option>
          <option value="production" className="bg-black text-white">Film Production</option>
          <option value="creative" className="bg-black text-white">Creative Visual Campaign</option>
          <option value="event" className="bg-black text-white">Event Management</option>
          <option value="other" className="bg-black text-white">General Inquiry</option>
        </select>
      </div>

      {/* Message Text Area (Required) */}
      <div className="relative flex items-start bg-white/[0.02] border border-white/10 focus-within:border-[#0FB6AE]/40 transition-all duration-300 px-4 py-3.5 rounded-lg w-full group">
        <MessageSquare size={16} className="text-cyan-400 group-focus-within:text-[#0FB6AE] mt-1 transition-colors duration-300" />
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message" 
          rows={4}
          required
          className="bg-transparent text-white placeholder-slate-500 text-sm w-full ml-3 focus:outline-none font-plus resize-none"
        />
      </div>

      {/* Error Message */}
      {isError && (
        <p className="text-red-400 text-xs font-plus text-center -mt-2">
          Something went wrong while sending your enquiry. Please try again.
        </p>
      )}

      {/* Premium Submit Button */}
      <button 
        type="submit"
        disabled={isSubmitting}
        className="relative group overflow-hidden w-full py-4 rounded-full bg-gradient-to-r from-[#491833] to-[#491833] text-white font-plus font-medium text-xs tracking-wide flex items-center justify-center space-x-2.5 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-85"
      >
        {isSubmitting ? (
          <>
            <span className="relative z-10">SUBMITTING...</span>
            <svg className="animate-spin h-3.5 w-3.5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.642z"></path>
            </svg>
          </>
        ) : (
          <>
            <span className="relative z-10">SUBMIT ENQUIRY</span>
            <Send size={13} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

    </form>
  )
}

export default ContactForm;

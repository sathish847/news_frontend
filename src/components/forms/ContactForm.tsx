'use client'
import React from 'react'

export default function ContactForm() {
   const [message, setMessage] = React.useState('');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Since this is static export, simulate success
      setMessage('✅ Thank you for your message! (This is a demo - email not sent in static mode)');
      (e.target as HTMLFormElement).reset();
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="row">
            <div className="col-md-6">
               <div className="form-grp">
                  <input type="text" name="user_name" placeholder="Name*" required />
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <input type="email" name="user_email" placeholder="E-mail*" required />
               </div>
            </div>
         </div>
         <div className="form-grp">
            <input type="number" name="user_phone" placeholder="Phone*" required />
         </div>
         <div className="form-grp">
            <textarea name="message" placeholder="Message*" required></textarea>
         </div>
         <button type="submit" className="btn btn-two">Submit Now</button>
         {message && <p className="text-success mt-2">{message}</p>}
      </form>
   )
}

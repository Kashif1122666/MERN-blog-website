import React from 'react'
import { useSelector } from 'react-redux';

function About() {
    const   {theme}  = useSelector(state => state.theme);
  return (
    // <div className={`${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'}`}>About</div>
      <div className={`${theme === 'light' ? 'bg-white text-gray-700' : 'text-white bg-[rgb(16,23,42)]'} min-h-screen`}>
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div >
            <h1 className='text-3xl font-semibold text-center my-7'>About Skills Exchange</h1>
            <div className="text-md text-gray-500 flex flex-col gap-6">
              <p>           
At Skills Exchange, we believe everyone has something valuable to teach—and something new to learn. Our platform connects passionate individuals who want to share their skills, from coding and cooking to sports and marketing, in a fair, friendly, and reciprocal exchange. No fees, no subscriptions—just a community built on mutual growth and collaboration. Whether you’re looking to expand your abilities, meet like-minded learners, or simply give back by mentoring others, you belong here. Join us and discover the power of trading knowledge!
              </p>
              <p>
                How It Works
Post Your Skill – Share what you can teach (e.g., guitar lessons, resume writing) and add your WhatsApp number.

Browse & Connect – Find someone offering a skill you need, click their WhatsApp icon, and chat instantly.

Learn & Share – Arrange sessions your way—online, in-person, or through voice notes.

Why Wait? Post your skill today and start trading knowledge in minutes!
              </p>
              <p>
                Join the Movement!
Skills are meant to be shared, not kept hidden. Every conversation you start here unlocks new opportunities—for you and others. Whether you're mastering a new language, honing a craft, or passing on professional expertise, your knowledge matters. Post your skill now, tap into a network of eager learners, and let’s grow together—one WhatsApp chat at a time. The next skill swap could change your life!
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default About
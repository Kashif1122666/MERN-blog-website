import React from 'react';
import { Footer, FooterIcon } from 'flowbite-react';
import { FooterCopyright, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter}  from 'react-icons/bs';
const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-bold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Skills
              </span>
              Exchange
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
               <FooterTitle title="About" className='mt-2' />
            <FooterLinkGroup >
               <div className='flex-col space-y-2'>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                 100 skills
              </FooterLink>
              <FooterLink href='/about' target='_blank' rel='noopener noreferrer'>
                 Skills exchange 
              </FooterLink>
              </div>
            </FooterLinkGroup >
            </div>
            <div>
               <FooterTitle title="Follow us" className='mt-2' />
            <FooterLinkGroup >
                  <div className='flex-col space-y-2'>
                                       <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                 Github
              </FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                 Discord 
              </FooterLink>
                  </div>
            </FooterLinkGroup >
            </div>
            <div>
               <FooterTitle title="Legal" className='mt-2' />
            <FooterLinkGroup >
                  <div className='flex-col space-y-2'>
                                       <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                 Privacy 
              </FooterLink>
              <FooterLink href='#' target='_blank' rel='noopener noreferrer'>
                 Terms &amp; conditions  
              </FooterLink>
                  </div>
            </FooterLinkGroup >
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <FooterCopyright href='#' by='Skills exchange' year={new Date().getFullYear()}/>
        </div>
        <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
          <FooterIcon href='#' icon={BsFacebook} />
          <FooterIcon href='#' icon={BsInstagram} />
          <FooterIcon href='#' icon={BsTwitter} />
          <FooterIcon href='#' icon={BsGithub} />
          <FooterIcon href='#' icon={BsDribbble} />
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;

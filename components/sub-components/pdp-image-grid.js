import React from 'react';
import Image from 'next/image'; 

export default function PdpImageGrid({images}){ 
  let imagesMap = () => {
    return images.map((url) => {
      return (
        <div className='w-1/2' key={url}>
          <img src={url} />
        </div>
      )
    })
  }
  return (
    <div className='flex flex-wrap w-full'>
      {imagesMap()}
   </div>
   )
 }
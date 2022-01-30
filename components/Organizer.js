import React from 'react';
import {app} from '../app.config';
import dynamic from 'next/dynamic'

const importComponent = (path) => dynamic(() => import(path));

export default function Organizer(props) {
  let Layout = app.layout.landing.map(({type, style}) => {
    let path = `./${type}/${style}`
    let Component = importComponent(path);
    return <Component key={type+style}/>
  })
  return Layout
}

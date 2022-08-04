import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import ipfs from "./api/ipfs";

export default function Home() {

  const [buffer , setBuffer] = useState(null);
  const [hash, setHash] = useState(null);

  const fileChange = (event) => {
    event.preventDefault()
  }

  const formSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <div>
         Upload to ipfs
      </div>
      <form onSubmit={formSubmit}>
        <input type="file" onChange={fileChange} />
        <input type='submit' />
      </form>
    </div>
  )
}

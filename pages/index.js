import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import ipfs from "./api/ipfs";

export default function Home() {
  const [buffer , setBuffer] = useState(null);
  const [hash, setHash] = useState(null);

  const fileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      setBuffer(buffer);
    }
  }

  const formSubmit = async (event) => {
    event.preventDefault();
    const fileHash = await ipfs.add(buffer);
    setHash(fileHash.path);
  }

  return (
    <div>
      <h1>Upload to Ipfs</h1>
      <form onSubmit={formSubmit}>
        <input type="file" onChange={fileChange} />
      {!buffer ? <div>Please upload a file</div>: <input type='submit' />}
      </form>
      {!hash ? null : <div><img src={`https://ipfs.infura.io/ipfs/${hash}`} /> <div><a href={`https://ipfs.infura.io/ipfs/${hash}`}>Link</a></div> </div>}
    </div>
  )

}

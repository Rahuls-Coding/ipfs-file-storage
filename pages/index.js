import { useState } from 'react'
import ipfs from "./api/ipfs";

export default function Home() {
  const [buffer , setBuffer] = useState(null);
  const [hash, setHash] = useState(null);
  const [type, setType] = useState(false);

  const fileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      setBuffer(buffer);
    }
    if (file['type'].split('/')[0] === 'image') {
      setType(true);
    } else {
      setType(false);
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
      {!hash 
      ? null 
      : 
      <div> 
        {type 
        ? <embed src={`https://ipfs.infura.io/ipfs/${hash}`} width='800px' height='500px' /> 
        : 
        <video width="560" height="315" preload='auto' controls>
          <source src={`https://ipfs.infura.io/ipfs/${hash}`} type="video/mp4" />
        </video>
        }

          <div><a href={`https://ipfs.infura.io/ipfs/${hash}`}>Link</a></div> 
      </div>}
      <div>favicon</div>
    </div>
  )

}



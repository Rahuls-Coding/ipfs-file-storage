import { useState } from 'react'
import ipfs from "./api/ipfs";

export default function Home() {
  const [type, setType] = useState(false);
  let [hashing, setHashing] = useState([]);
  const totalHash = []

  const fileChange = (event) => {
    event.preventDefault();
      const files = event.target.files;
      Object.keys(files).forEach( (i) => {
        const file = files[i]
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
          const currentBuffer = [Buffer.from(reader.result)];
          const filehash = await ipfs.add(currentBuffer);
          !filehash  ?  null : 
          totalHash.push(filehash.path)
          setHashing([...totalHash, filehash])
          console.log(hashing, 'hashing')
          console.log(totalHash, 'ternary test')
          console.log(filehash.path)
      }
      if (file['type'].split('/')[0] === 'image') {
        setType(true);
      } else {
        setType(false);
      }
      })
      console.log(totalHash, 'total hash before submit')
  }


  const formSubmit = async (event) => {
    event.preventDefault();
    console.log(totalHash, 'total hash');
  }


  const renderFiles = () => {
    
  }

  return (
    <div>
      <h1>Upload to Ipfs</h1>
      <form onSubmit={formSubmit}>
        <input type="file" onChange={fileChange} multiple/>
        <input type='submit' />
      </form>
      <div>
      {!totalHash 
        ? null 
        : 
        <div>
        {totalHash.map( (i) => {
            console.log('testing')
            return <div key={i}><embed src={`https://ipfs.infura.io/ipfs/${totalHash[i]}`} width='800px' height='500px' />
            <a href={`https://ipfs.infura.io/ipfs/${totalHash}`}>Link</a></div> 
            //  <video width="560" height="315" preload='auto' controls>
            //   <source src={`https://ipfs.infura.io/ipfs/${totalHash[i]}`} type="video/mp4" />
            // </video>
              }
            )
        }
        </div>
      }
      </div>
    </div>
  )

}

import React, {useState} from 'react';
import ipfs from "./api/ipfs";
import add from 'it-all'

export default function Upload() {
    
    const [buffer, setBuffer] = useState(null);
    const [hash, setHash] = useState([]);

    const  readAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onerror = reject
          fr.onload = function () {
            resolve(fr.result)
          }
          fr.readAsArrayBuffer(file)
        })
      }


   const  fileChange =  (e) => {
        e.preventDefault();
        Promise.all(Array.from(e.target.files).map(readAsArrayBuffer))
        .then((urls) => {
            setBuffer(urls)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    
   const  formSubmit = async (event) => {
        event.preventDefault();
        console.log(buffer, 'buffer on submit')
        const fileHash = await add(ipfs.addAll(buffer))
        console.log(fileHash, 'file hash')
    }
        return (
            <div>
                <h1>Upload to Files</h1>
                <form onSubmit={formSubmit}>
                    <input type="file" onChange={fileChange} multiple/>
                    <input type='submit' />
                </form>
                <div>

                </div>
            </div>
        )
    


                
}

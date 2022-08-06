import React, {useState} from 'react';
import ipfs from "./api/ipfs";
import add from 'it-all'

export default function Upload() {
    
    const [buffers, setbuffers] = useState(null);
    const [hash, setHash] = useState([]);
    let newHash = []

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
            setbuffers(urls)
        })
        .catch((error) => {
          console.error(error)
        })
    }

 
    
    
   const  formSubmit = async (event) => {
        event.preventDefault();
        console.log(buffers[0], 'buffers on submit 1', buffers[2], 'buffers on submit 2')
        for (let buffer of buffers) {
            let filehash = await ipfs.add(buffer)
            console.log(filehash.path)
            newHash.push(filehash.path)
            console.log(newHash)
        }
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

import React, {useState} from 'react';
import ipfs from "./api/ipfs";
import add from 'it-all'
import { render } from 'react-dom';

export default function Home() {
    
    const [buffers, setbuffers] = useState(null);
    let typeOfFile = []
    let newHash = []
    let thingsToRender = []


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
            console.log(urls, 'urls')
            // for (let i = 0; i < urls.length; i++) {
            //       if (fr['type'].split('/')[0] === 'image') {
            //         setType(true);
            //       } else {
            //         setType(false);
            //       }
            // }
        })
        .catch((error) => {
          console.error(error)
        })
    }

   const  formSubmit = async (event) => {
        event.preventDefault();
        // console.log(buffers[0], 'buffers on submit 1', buffers[2], 'buffers on submit 2')
        for (let buffer of buffers) {
            console.log('adding to ipfs')
            let filehash = await ipfs.add(buffer)
            console.log(filehash)
            newHash.push(filehash.path)
            console.log(newHash)
        }
        renderFiles()

   }


   const renderFiles = () => {
    for (let i = 0; i < newHash.length; i++) {
      // <video width="560" height="315" preload='auto' controls>
      //         <source src={`https://ipfs.infura.io/ipfs/${totalHash[i]}`} type="video/mp4" />
      // </video> 
      console.log('rendering...')
      thingsToRender.push(
            <embed key={i} src={`https://ipfs.infura.io/ipfs/${newHash[i]}`} width='800px' height='500px' />

      )
      console.log(thingsToRender)
    }
   }


        return (
            <div>
                <h1 className='noselect'>Upload to Files</h1>
                <form onSubmit={formSubmit}>
                    <input type="file" onChange={fileChange} multiple/>
                    <input type='submit' />
                </form>
                <div>{!thingsToRender ?  thingsToRender : <div>loading..</div>}</div>
            </div>
        )                
}

import React, {useState, useCallback, useRef} from 'react';
import ipfs from "./api/ipfs";
const Hash = require('ipfs-only-hash')



function resetFileInput(fileInputEl) {
  if (!fileInputEl) return;
  fileInputEl.type = "text";
  fileInputEl.type = "file";
  fileInputEl.setAttribute("value", "");
}

async function readFileAsText(file) {
  const reader = new FileReader();
  const promise = new Promise((resolve) => {
    reader.onload = (e) => {
      const contents = e.target?.result;
      resolve(contents);
    };
  });
  reader.readAsText(file);
  return promise;
}

export default function Home() {
    
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [localHash, setLocalHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateFile = useCallback(
    async (file) => {
      setIsLoading(true);
      setFile(file);
      const text = await readFileAsText(file);
      // options: https://github.com/ipfs-inactive/js-ipfs-unixfs-importer#api
      const cid = await Hash.of(text, {
        cidVersion: 1,
        rawLeaves: true
      });
      console.log(cid)
      setLocalHash(cid);

      // const file = new Blob([str], { type: "plain" });
      // const remoteHash = await pinFile(apiKey, apiSecret, file);
      // setRemoteHash(remoteHash);
      // await unpin(apiKey, apiSecret, remoteHash);
      // setIsLoading(false);
    },
    []
  );


        return (
            <div>
                <h1 className='noselect'>Upload to Files</h1>
                <div className="ba pa1">
                  <input
                    ref={fileRef}
                    type="file"
                    className="bg-dark-blue white pa2 db w-100"
                    onChange={(e) => updateFile(e.target.files[0])}
                  />
                  {file && (
                    <iframe
                      // ref={iframeFilePreview}
                      src={window.URL.createObjectURL(file)}
                      width="100%"
                      title="ipfs preview"
                      className="db mt1 ba"
                      style={{ height: "20vh" }}
                    />
                  )}
                </div>
            </div>
        )                
 
}
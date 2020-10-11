import React, { useEffect , useState } from 'react';
import axios from  'axios';


const cute = 'https://www.reddit.com/r/eyebleach/random.json'
const wow = 'https://www.reddit.com/r/confusing_perspective/random.json'
const smile = 'https://www.reddit.com/r/memes/random.json'

const isValidUrl = url =>  (url.includes("jpg") || url.includes("jpeg") || url.includes("gif")) && !url.includes("gifv")


        
        

export default function Showexpression({expression}) {
    const [ resp, setResp ] = useState(null);
    const [ lastExpression, setLastExpression ] = useState(null);
    useEffect(()=> {

        const fetchContent = async() => {

            let finished = false;
            const loop = async (url) => {
                return new Promise(async (resolve, reject) => {
                    const inner = async () => {
                        if (!finished) {
                            let post = await axios.get(url);
                            let postUrl = post.data[0].data.children[0].data.url;
                            if (isValidUrl(postUrl)) { 
                               finished = true;
                               setResp(post)
                               resolve();
                            } else {
                               return inner();
                            }
                        }
                    }
                    await inner();
                })
            }

            try { 


                if(expression === "happy") {
                    await loop(smile);
                    

                }
                else if(expression === "surprised") {
                    await loop(wow);
    
                }
                else if(expression === "sad"|| expression ==="fearful") {
                    await loop(cute)
                }
                
                
            }
            catch  {
                console.log('error')
            }
            
        }

            if(expression !== "neutral" && lastExpression !== "expression") {
                
                setLastExpression(expression);
                
                fetchContent()
            }
        

    }, [expression])

    return (
        <>     
            {resp?.data ? 
            <>
                <img style={{width:"300px", maxWidth:"100vw", objectFit:"cover"}}src={resp.data[0].data.children[0].data.url}/> 
            </>


            :'Loading'}
        </>
    )
}
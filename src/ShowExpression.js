import React, { useEffect , useState } from 'react';
import axios from  'axios'

const url1 = 'https://www.reddit.com/r/eyebleach/random.json?&count=10'
const url2 = 'https://www.reddit.com/r/confusing_perspective/random.json?&count=10'

const isValidUrl = url =>  url.includes("jpg") || url.includes("jpeg") || url.includes("gif")


        
        

export default function Showexpression({expression}) {
    const [ resp, setResp ] = useState(null);
    const [ lastExpression, setLastExpression ] = useState(null);

    useEffect(()=> {

        const fetchContent = async() => {
            console.log('fetching');
            let finished = false;
            const loop = async (url) => {
                return new Promise(async (resolve, reject) => {
                    const inner = async () => {
                        if (!finished) {
                            let post = await axios.get(url);
                            let postUrl = post.data[0].data.children[0].data.url;
                            console.log(postUrl)
                            if (isValidUrl(postUrl)) { 
                               finished = true;
                               console.log("This is my resolve",resolve());
                            } else {
                               return inner();
                            }
                        }
                    }
                    await inner();
                })
            }

            try { 


                if(expression === "surprised") {
                    await loop(url1);
                    

                }
                else if(expression === "happy") {
                    await loop(url2);
                    // let response = await axios.get(url1);

                    // let url = response.data[0].data.children[0].data.url;
    
                }
                
                
            }
            catch  {
                console.log('error')
            }
            
        }

        if(expression !== "neutral" && lastExpression !== expression) {
            setLastExpression(expression);

           
            fetchContent()
        }
        

    }, [expression])
    console.log(resp, expression)
    return (
        <div className="view">
            {/* <h1>{expressions}</h1> */}
            {resp?.data ? <img style={{width:"500px"}}src={resp.data[0].data.children[0].data.url}/> :'nothing'}
            {/* {resp && expression ? <div>
                        {resp.data.data.children.map((post,i) => {
                            if(post.data.url.includes('jpg')) {
                                return <img className="jpg" key={post.data.title + i} src={post.data.url}></img>
                            }
                            return <h1  key={post.data.title + i} >{post.data.url}</h1>
                        })
                        }
                   </div> : "no data"} */}
        </div>
    )
}

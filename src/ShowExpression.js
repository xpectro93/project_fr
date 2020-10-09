import React, { useEffect , useState } from 'react';
import axios from  'axios'


const url1 = 'https://www.reddit.com/r/eyebleach.json?&count=10'
const url2 = 'https://www.reddit.com/r/confusingperspective.json?&count=10'
const url3 = 'https://www.reddit.com/r/pics.json?&count=10'


export default function Showexpression({expression}) {
    const [ resp, setResp ] = useState(null);
    const [ lastExpression, setLastExpression ] = useState(null);

    useEffect(()=> {

        const fetchContent = async() => {
            console.log('fetching')
            try { 
                if(expression === "surprised") {
                    let response = await axios.get(url2);
                    setResp(response)
                }
                else if(expression === "happy") {
                    let response = await axios.get(url1);
                    setResp(response)
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
            {resp && expression ? <div>
                        {resp.data.data.children.map((post,i) => {
                            if(post.data.url.includes('jpg')) {
                                return <img className="jpg" key={post.data.title + i} src={post.data.url}></img>
                            }
                            return <h1  key={post.data.title + i} >{post.data.url}</h1>
                        })
                        }
                   </div> : "no data"}
        </div>
    )
}

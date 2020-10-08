import React, { useEffect , useState, useMemo } from 'react';
import axios from  'axios'


const url1 = 'https://www.reddit.com/r/eyebleach.json?&count=10'
const url2 = 'https://www.reddit.com/r/confusingperspective.json?&count=10'
const url3 = 'https://www.reddit.com/r/pics.json?&count=10'
export default function Showexpression({expressions}) {
    const [ resp, setResp ] = useState(null);
    let topExpression = {
        name :"Loading",
        value : 0
    }
    useEffect(()=> {
        const fetchContent = async () => {
           
                try {
                    if(topExpression === "surprised") 
                    {
                        let response = await axios.get(url1);
                        setResp(response)
                        console.log('this is happening')
    
                    }
                    else if(topExpression === "neutral"){
                        let response = await axios.get(url2);
                        setResp(response)
                    }else {
                        let response = await axios.get(url3);
                        setResp(response)
                    }
                }
                catch {
        
                }
            
        }
        fetchContent()
        
    }, [])
    



  
  
        if(expressions) {
            for(let expression in expressions) {
    
               if(expressions[expression] > topExpression.value) {
                    topExpression.name = expression;
                    topExpression.value = expressions[expression]
                }
            }
    
        }


        

    return (
        <div className="view">
            <h1>{topExpression.name}</h1>
            {resp ? <div>
                        {resp.data.data.children.map(post => {
                            if(post.data.url.includes('jpg')) 
                            {
                                return <img className="jpg" src={post.data.url}></img>
                            }
                            return <h1>{post.data.url}</h1>
                        })
                        }
                   </div> : "no data"}
        </div>
    )
}
                            // post.data.url.includes("gif") ||
                            // post.data.url.includes("jpeg")||
                            // post.data.url.includes("gif") ||
                            // post.data.url.includes("gfycat")
import React, { useEffect , useState } from 'react';
import axios from  'axios'


const url = 'https://www.reddit.com/r/eyebleach.json?&count=25'
export default function Showexpression({expressions}) {
    const [ resp, setResp ] = useState(null);

    useEffect(()=> {
        const fetchContent = async () => {
            try {
                let response = await axios.get(url);
                console.log("REDDIT",response);
                setResp(response)
            }
            catch {
    
            }
        }
        fetchContent()
    }, [])
    



    let topExpression = {
        name:"Loading",
        value:0
    };
  
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
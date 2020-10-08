import React, { useEffect} from 'react';
import axios from  'axios'


const url = 'https://www.reddit.com/r/eyebleach.json?&count=25'
export default function Showexpression({expressions}) {
    useEffect(()=> {
        const fetchContent = async () => {
            try {
                let response = await axios.get(url);
                console.log("REDDIT",response)
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
        <>
            <h1>{topExpression.name}</h1>
        </>
    )
}

import React from 'react';

export default function Showexpression({expressions}) {
    
    let topExpression = {
        name:"None",
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

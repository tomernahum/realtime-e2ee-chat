
async function doSomething(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("OH YEAH DID TO THE MAX")
}

async function myFunc(){
    console.log("WHATS UP")
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    doSomething()
    
    console.log("Done babeh")
    
    return true
}

async function main(){
    await myFunc()
    console.log("all done")
}

main()
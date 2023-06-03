const fs=require("fs")
const path=require("path")

let deepDir
let maxDepth=0
function find(folderPaths,depth=0){

    //const folderPaths=[path.resolve(__dirname,"node_modules")]

    folderPaths.forEach(folderPath=>{
        const results=fs.readdirSync(folderPath)
        const folders=results.filter(res=>{
           return fs.statSync(path.resolve(folderPath,res)).isDirectory()
          
        })
        
    if(folders.length===0){
        return
    }
    if(depth>maxDepth){
        deepDir=folderPath
        maxDepth=depth
    }

     const innerPaths=folders.map(folder=>path.resolve(folderPath,folder))

    //innerPaths.forEach(innerPath=>listFolders.push(innerPath,depth+1))
        find(innerPaths,depth+1)
        
        })
  
    }
find([path.resolve(__dirname,"node_modules")])

if(deepDir){
    const filePath=path.resolve(deepDir,"file.txt")
    fs.writeFile(filePath,"Hello world",(err)=>{
        if(err){
            console.log("Error")
        }else{
            console.log("Created",filePath)
        }
        })
        
}


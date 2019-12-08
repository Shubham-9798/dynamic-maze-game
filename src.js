let tbl = document.createDocumentFragment()
let blk = document.getElementById("tbl")
let rowBtn = document.getElementById("row")
let colBtn = document.getElementById("col")
let blkBtn = document.getElementById("done")

let rowFrag
let colFrag
let tr
let path
let arr


let row = 0
let col = 5
let promiseFun = (type) => new Promise((resolve, reject)=>{
    if(type === "row")
    {
        row++
        console.log(`${type}`+" incremented")
    }
    else
    {
        col++
        console.log(`${type}`+" incremented")
    }
    // console.log({row, col})
    resolve(`${type}`)
})
.then((type) => {
    if(type === "row") {  //working-in-case-of-rowwise
        rowFrag = document.createDocumentFragment()
        // make-row
        for(let i=0; i<col; i++) {
            var td = document.createElement('td')
            rowFrag.appendChild(td);
        }
        tr =document.createElement('tr')
        tr.appendChild(rowFrag)
        // console.log(rowFrag)

    } else {
        colFrag = document.createDocumentFragment()
        let colNeed = document.querySelectorAll('tr')
        // console.log(colNeed)
        // --> makeCol
        colNeed.forEach(tr =>{
            var td = document.createElement('td')
            tr.appendChild(td);
            // console.log(tr)
        })
        console.log("differet ways to do")
        console.log(colFrag)
    }

    console.log("fragment-created")

    return new Promise((resolve, reject) =>{
         resolve(type)
     })
})
.then((type) => {
    // console.log("then")
    // console.log(rowFrag)
    if(type === "row") {
        blk.appendChild(tr)
    }
})
.then(() => {
    console.log("then")
})

promiseFun("row")

let makeIdWhenDone = () =>{
    console.log("done")
    let j = 0, k=0;
    let block = document.querySelectorAll('td')
    return new Promise((resolve, reject) =>{
        block.forEach((td, i) =>{
            td.id = String(j)+ "," + k
            td.style.background = `grey`
            td.innerHTML = String(j)+k
            k++
            td.addEventListener("click", (event) => {
                let a = event.srcElement.id.split(",")
                event.srcElement.style.background = "black"
                arr[a[0]][a[1]] = 1;
                console.log(path)
            })

            if((i+1)%col === 0)
              { j++; k=0; }
    
            // console.log(td)
        })
        resolve("indexing Done")
    }).then((j) => {
        console.log(j)
        path = [...Array(row)].map(e => Array(col).fill(0));
        arr = [...Array(row)].map(e => Array(col).fill(0));
        console.info(path)
        blkBtn.disabled = true
        rowBtn.disabled  = true
        colBtn.disabled = true
    })
}


let start = () => {
    let func = function(arr, path, i, j) {
        console.log(row, col)
        var str = String(i)+","+String(j); 
        console.log(arr[i][j])
		if(i<0 || i>row-1 || j<0 || j>col-1 || arr[i][j] == 1 || path[i][j] == 1) {
            return 0;
           }
        if(i===row-1 && j===col-1) {
            console.log('win');
            console.table(path)
            document.getElementById(str).style.backgroundColor = "red"
            return 1;
          }

          path[i][j] = 1;
          var lft, rgt, up, dwn;
          setTimeout(()=> { lft = func(arr, path, i-1, j)},1000)
          setTimeout(()=> { rgt = func(arr, path, i+1, j)},1000)
          setTimeout(()=> { up =  func(arr, path, i, j+1)},1000)
          setTimeout(()=> { dwn = func(arr, path, i, j+1)},1000)
          document.getElementById(str).style.backgroundColor = "pink"
  
          if(lft) { console.log("lft"); path[i][j]=0; document.getElementById(str).style.backgroundColor="white"; return 1;}
          if(rgt) { console.log("rgt"); path[i][j]=0; document.getElementById(str).style.backgroundColor="white";return 1;}
          if(up)  { console.log("up"); path[i][j]=0; document.getElementById(str).style.backgroundColor="white";return 1;}
          if(dwn) { console.log("dwn"); path[i][j]=0; document.getElementById(str).style.backgroundColor="white";return 1;}

        return 0;
    }

    func(arr, path, 0, 0)
    console.log(path)
    console.log(arr)
}




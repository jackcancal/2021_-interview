class MyPromise {
  constructor(executor) {
    this.state = "pending"
    this.value = null;
    this.resolveList = [];
    this.rejectList = [];
    const resolve = value => {
      if (this.state === "pending"){
        this.state = "fulfilled";
        this.value = value;
        this.resolveList.forEach(f=>f(this.value))
      }
    }
    const reject = value => {
      if (this.state === "pending"){
        this.state = "rejected";
        this.value = value;
        this.rejectList.forEach(f=>f(this.value))
      }
    }
    try {
      executor(resolve,reject)
    }catch (e){
      reject(e)
    }
  }
  then(f1, f2){
    return new MyPromise((resolve, reject) => {
      this.resolveList.push(() => {
        const f = f1(this.value)
        if (f instanceof MyPromise) f.then(resolve, reject)
        else resolve(f)
      })
      this.rejectList.push(()=>{
        const f = f2(this.value)
        if (f instanceof MyPromise) f.then(resolve, reject)
        else reject(f)
      })
    })
  }
  catch(f){
    return this.then(()=>{}, f)
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(function (){
    resolve(1)
  },1000)
})
p.then(res=>{
  console.log(res)
  return new MyPromise((s,r)=>{
    setTimeout(function () {
      r(11)
    },1000)
  })
}).catch(res=>{
  console.log(res)
})